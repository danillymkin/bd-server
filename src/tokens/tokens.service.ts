import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Token } from './entities/token.entity';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from './interfaces/token-payload.interface';

@Injectable()
export class TokensService {
  constructor(
    @InjectRepository(Token) private tokensRepository: Repository<Token>,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  public async generate(user: User): Promise<string> {
    const payload = this.createPayload(user);
    const secret = this.configService.get<string>('JWT_REFRESH_SECRET');
    const expiresIn = this.configService.get<string>('JWT_REFRESH_EXPIRES_IN');
    return this.jwtService.sign(payload, {
      expiresIn,
      secret,
    });
  }

  public async save(userId: number, refreshToken: string): Promise<Token> {
    const tokenFromDB = await this.findByUserId(userId);
    if (tokenFromDB) {
      tokenFromDB.refreshToken = refreshToken;
      return await this.tokensRepository.save(tokenFromDB);
    }
    const token = this.tokensRepository.create({ userId, refreshToken });
    return await this.tokensRepository.save(token);
  }

  public async remove(refreshToken: string): Promise<void> {
    await this.tokensRepository.delete({ refreshToken });
  }

  public async findOne(refreshToken: string): Promise<Token> {
    return await this.tokensRepository.findOne({ refreshToken });
  }

  public createPayload(user: User): TokenPayload {
    return { id: user.id, email: user.email };
  }

  public validate(refreshToken: string): TokenPayload {
    try {
      const secret = this.configService.get<string>('JWT_REFRESH_SECRET');
      return this.jwtService.verify(refreshToken, { secret });
    } catch (e) {
      throw new UnauthorizedException({
        message: 'Пользователь не авторизован',
      });
    }
  }

  private async findByUserId(userId: number): Promise<Token> {
    return await this.tokensRepository.findOne({ userId });
  }
}
