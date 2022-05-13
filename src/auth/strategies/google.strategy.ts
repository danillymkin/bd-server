import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';
import { Inject, Injectable } from '@nestjs/common';
import {
  USER_SERVICE,
  UserService,
} from '../../users/interfaces/user-service.interface';
import { RoleService } from '../../role/role.service';
import { RoleName } from '../../role/enums/role-name.enum';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private configService: ConfigService,
    private roleService: RoleService,
    @Inject(USER_SERVICE) private userService: UserService,
  ) {
    super({
      clientID: configService.get<string>('OAUTH_GOOGLE_ID'),
      clientSecret: configService.get<string>('OAUTH_GOOGLE_SECRET'),
      callbackURL: configService.get<string>('OAUTH_GOOGLE_REDIRECT_URL'),
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ) {
    const { id, name, emails } = profile;
    const role = await this.roleService.getByName(RoleName.USER);

    const user = {
      provider: 'google',
      providerId: id,
      email: emails[0].value,
      firstName: name.givenName,
      roles: [role],
      lastName: name.familyName,
      password: '',
      createdAt: new Date(),
      updatedAt: new Date(),
      isActivated: false,
    };

    done(null, user);
  }
}
