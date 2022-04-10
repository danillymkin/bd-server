import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
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
import { AccessToken } from './interfaces/access-token.interface';
import { MailService } from '../mail/mail.service';
import { TokenPayload } from '../tokens/interfaces/token-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private tokensService: TokensService,
    private configService: ConfigService,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  public async profile(refreshToken: string): Promise<User> {
    const tokenPayload = this.tokensService.validate(refreshToken);
    return await this.usersService.getByEmail(tokenPayload.email);
  }

  public async login(user: User, response: Response): Promise<AccessToken> {
    await this.setRefreshToken(user, response);
    return this.getAccessToken(user);
  }

  public async register(
    registerUserDto: RegisterUserDto,
    response: Response,
  ): Promise<AccessToken> {
    await this.checkUserIsNotExist(registerUserDto.email);
    const user = await this.createUser(registerUserDto);
    await this.sendActivationMail(user.email, user.activationLink);
    return await this.login(user, response);
  }

  public async refresh(
    refreshToken: string,
    response: Response,
  ): Promise<AccessToken> {
    const tokenPayload = await this.getTokenPayloadFromRefresh(refreshToken);
    const user = await this.usersService.getByEmail(tokenPayload.email);
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

  private async checkUserIsNotExist(email: string) {
    const candidate = await this.usersService.getByEmail(email);
    if (candidate) {
      throw new BadRequestException({
        message: `Пользователь с почтовым адресом ${email} уже существует`,
      });
    }
  }

  private async createUser(registerUserDto: RegisterUserDto): Promise<User> {
    const hashPassword = await this.getHashedPassword(registerUserDto.password);
    const activationLink = uuid.v4();
    return await this.usersService.create({
      ...registerUserDto,
      password: hashPassword,
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

  private getAccessToken(user: User): AccessToken {
    const payload = this.tokensService.createPayload(user);
    const secret = this.configService.get<string>('JWT_ACCESS_SECRET');
    const expiresIn = this.configService.get<string>('JWT_ACCESS_EXPIRES_IN');
    return {
      accessToken: this.jwtService.sign(payload, {
        secret,
        expiresIn,
      }),
    };
  }

  private async getHashedPassword(password: string): Promise<string> {
    const hashSalt = +this.configService.get<number>('HASH_SALT');
    return await bcrypt.hash(password, hashSalt);
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
