import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Post,
  Redirect,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RegisterUserDto } from './dto/register-user.dto';
import { REFRESH_TOKEN_COOKIE_NAME } from './utils/constants';
import { User } from '../users/entities/user.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserData } from './decorators/user-data.decorator';
import { RefreshToken } from './decorators/refresh-token.decorator';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { UserAndToken } from '../users/types/user-and-token.type';
import { AUTH_SERVICE, AuthService } from './interfaces/auth-service.interface';

@ApiTags('Аутентификация')
@Controller('auth')
export class AuthController {
  constructor(@Inject(AUTH_SERVICE) private authService: AuthService) {}

  @ApiOperation({ summary: 'Войти в аккаунт' })
  @ApiResponse({ status: HttpStatus.OK })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  public login(
    @UserData() userData: User,
    @Res({ passthrough: true }) response: Response,
  ): Promise<UserAndToken> {
    return this.authService.login(userData, response);
  }

  @ApiOperation({ summary: 'Зарегистрировать аккаунт' })
  @ApiResponse({ status: HttpStatus.OK })
  @Post('register')
  public register(
    @Body() registerUserDto: RegisterUserDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<UserAndToken> {
    return this.authService.register(registerUserDto, response);
  }

  @ApiOperation({ summary: 'Обновить refresh token' })
  @ApiResponse({ status: HttpStatus.OK })
  @Get('refresh')
  public refresh(
    @Res({ passthrough: true }) response: Response,
    @RefreshToken() refreshToken: string,
  ): Promise<UserAndToken> {
    return this.authService.refresh(refreshToken, response);
  }

  @ApiOperation({ summary: 'Выйти из аккаунта' })
  @ApiResponse({ status: HttpStatus.OK })
  @Post('logout')
  public logout(
    @Res({ passthrough: true }) response: Response,
    @Req() request,
    @RefreshToken() refreshToken: string,
  ): Promise<void> {
    response.clearCookie(REFRESH_TOKEN_COOKIE_NAME);
    return this.authService.logout(refreshToken, request);
  }

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  // eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars
  public googleAuth(@Req() req) {}

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  @Redirect('http://localhost:3000')
  public googleAuthRedirect(@Req() req, @Res({ passthrough: true }) res) {
    return this.authService.googleLogin(req, res);
  }
}
