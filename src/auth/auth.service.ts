import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { User } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from './dto/register-user.dto';
import { TokensService } from '../tokens/tokens.service';
import {
  ACTIVATE_URL,
  MAX_AGE_REFRESH_TOKEN,
  REFRESH_TOKEN_COOKIE_NAME,
} from './utils/constants';
import * as uuid from 'uuid';
import { ConfigService } from '@nestjs/config';
import { MailService } from '../mail/mail.service';
import { TokenPayload } from '../tokens/interfaces/token-payload.interface';
import {
  USER_SERVICE,
  UserService,
} from '../users/interfaces/user-service.interface';
import { UserAndToken } from '../users/types/user-and-token.type';

@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_SERVICE) private userService: UserService,
    private tokensService: TokensService,
    private configService: ConfigService,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  public async login(
    userData: User,
    response: Response,
  ): Promise<UserAndToken> {
    await this.setRefreshToken(userData, response);
    const accessToken = this.getAccessToken(userData);
    const user = await this.userService.getSerializedUserById(userData.id);
    return {
      user,
      accessToken,
    };
  }

  public async register(
    registerUserDto: RegisterUserDto,
    response: Response,
  ): Promise<UserAndToken> {
    await this.checkUserIsNotExist(registerUserDto.email);
    const user = await this.createUser(registerUserDto);
    await this.sendActivationMail(user.email, user.activationLink);
    return await this.login(user, response);
  }

  public async refresh(
    refreshToken: string,
    response: Response,
  ): Promise<UserAndToken> {
    const tokenPayload = await this.getTokenPayloadFromRefresh(refreshToken);
    const user = await this.userService.getByEmail(tokenPayload.email);
    return await this.login(user, response);
  }

  private async getTokenPayloadFromRefresh(
    refreshToken: string,
  ): Promise<TokenPayload> {
    const tokenPayload = this.tokensService.validate(refreshToken);
    const tokenFromDB = await this.tokensService.findOne(refreshToken);
    if (!(tokenPayload && tokenFromDB)) {
      throw new UnauthorizedException({
        message: 'Пользователь не авторизован',
      });
    }
    return tokenPayload;
  }

  public async logout(refreshToken: string, request): Promise<void> {
    request.logout();
    await this.tokensService.remove(refreshToken);
  }

  public async googleLogin(req: Request, res: Response) {
    this.checkUserInReq(req);
    const candidate = await this.userService.getByEmail(
      req.user['email'] || '',
    );
    if (candidate) {
      return this.login(candidate, res);
    } else {
      return this.registerUserWithGoogle(req, res);
    }
  }

  private async registerUserWithGoogle(req: Request, res: Response) {
    const password = uuid.v4();
    return this.register(
      {
        email: req.user['email'],
        lastName: req.user['lastName'],
        firstName: req.user['firstName'],
        password,
        activationLink: '',
      },
      res,
    );
  }

  private async checkUserIsNotExist(email: string) {
    const candidate = await this.userService.getByEmail(email);
    if (candidate) {
      throw new BadRequestException({
        message: `Пользователь с почтовым адресом ${email} уже существует`,
      });
    }
  }

  private checkUserInReq(req: Request): BadRequestException {
    if (!req.user && !req.user['email']) {
      return new BadRequestException({
        message: 'Не удалось получить пользователя',
      });
    }
  }

  private async createUser(registerUserDto: RegisterUserDto): Promise<User> {
    const activationLink = uuid.v4();
    return await this.userService.create({
      email: registerUserDto.email,
      firstName: registerUserDto.firstName,
      lastName: registerUserDto.lastName,
      password: registerUserDto.password,
      activationLink,
    });
  }

  private async sendActivationMail(email: string, userLink: string) {
    const API_URL = this.configService.get<string>('API_URL');
    const activationLink = API_URL + ACTIVATE_URL + userLink;
    await this.mailService.sendActivationMail(email, activationLink);
  }

  private async setRefreshToken(user: User, response: Response) {
    const refreshToken = await this.tokensService.generate(user);
    await this.tokensService.save(user.id, refreshToken);
    this.setRefreshTokenInCookie(response, refreshToken);
  }

  private getAccessToken(user: User): string {
    const payload = this.tokensService.createPayload(user);
    const secret = this.configService.get<string>('JWT_ACCESS_SECRET');
    const expiresIn = this.configService.get<string>('JWT_ACCESS_EXPIRES_IN');
    return this.jwtService.sign(payload, {
      secret,
      expiresIn,
    });
  }

  private setRefreshTokenInCookie(
    response: Response,
    refreshToken: string,
  ): void {
    response.cookie(REFRESH_TOKEN_COOKIE_NAME, refreshToken, {
      maxAge: MAX_AGE_REFRESH_TOKEN,
      httpOnly: true,
    });
  }
}
