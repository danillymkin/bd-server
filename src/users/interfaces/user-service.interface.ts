import { User } from '../entities/user.entity';
import { RegisterUserDto } from '../../auth/dto/register-user.dto';
import { Response } from 'express';

export const USER_SERVICE = 'USER_SERVICE';

export interface UserService {
  getById(id: number): Promise<User>;

  getByEmail(email: string): Promise<User>;

  create(registerUserDto: RegisterUserDto): Promise<User>;

  activate(activationLink: string, response: Response): Promise<void>;

  validate(email: string, password: string): Promise<User>;

  getSerializedUserById(id: number): Promise<Partial<User>>;
}
