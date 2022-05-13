import { Module } from '@nestjs/common';
import { AuthServiceImpl } from './auth.service';
import { UserModule } from '../users/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { TokenModule } from '../token/token.module';
import { MailModule } from '../mail/mail.module';
import { GoogleStrategy } from './strategies/google.strategy';
import { RoleModule } from '../role/role.module';
import { AUTH_SERVICE } from './interfaces/auth-service.interface';

@Module({
  imports: [
    UserModule,
    PassportModule,
    ConfigModule,
    TokenModule,
    RoleModule,
    MailModule,
    JwtModule.register({}),
  ],
  providers: [
    { useClass: AuthServiceImpl, provide: AUTH_SERVICE },
    LocalStrategy,
    JwtStrategy,
    GoogleStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
