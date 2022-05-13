import { User } from '../../users/entities/user.entity';
import { Token } from '../entities/token.entity';
import { TokenPayload } from './token-payload.interface';

export const TOKEN_SERVICE = 'TOKEN_SERVICE';

export interface TokenService {
  generate(user: User): Promise<string>;

  save(userId: number, refreshToken: string): Promise<Token>;

  remove(refreshToken: string): Promise<void>;

  findOne(refreshToken: string): Promise<Token>;

  createPayload(user: User): TokenPayload;

  validate(refreshToken: string): TokenPayload;
}
