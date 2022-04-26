import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import {
  HttpCode,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '../../users/entities/user.entity';
import { UsersService } from '../../users/users.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<User> {
    try {
      return await this.usersService.validate(email, password);
    } catch (e) {
      throw new UnauthorizedException({
        messages: ['Неверный E-Mail или пароль'],
      });
    }
  }
}
