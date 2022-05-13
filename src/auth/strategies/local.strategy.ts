import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../../users/entities/user.entity';
import { USER_SERVICE, UserService } from '../../users/user-service.interface';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject(USER_SERVICE) private userService: UserService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<User> {
    try {
      return await this.userService.validate(email, password);
    } catch (e) {
      throw new UnauthorizedException({
        messages: ['Неверный E-Mail или пароль'],
      });
    }
  }
}
