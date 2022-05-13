import { User } from '../../user/entities/user.entity';
import { Request, Response } from 'express';
import { UserAndToken } from '../../user/types/user-and-token.type';
import { RegisterUserDto } from '../dto/register-user.dto';

export const AUTH_SERVICE = 'AUTH_SERVICE';

export interface AuthService {
  login(userData: User, response: Response): Promise<UserAndToken>;

  register(
    registerUserDto: RegisterUserDto,
    response: Response,
  ): Promise<UserAndToken>;

  refresh(refreshToken: string, response: Response): Promise<UserAndToken>;

  logout(refreshToken: string, request): Promise<void>;

  googleLogin(req: Request, res: Response);
}
