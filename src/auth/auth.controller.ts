import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { REFRESH_TOKEN_COOKIE_NAME } from './utils/constants';
import { User } from '../users/entities/user.entity';
import { AccessToken } from './interfaces/access-token.interface';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserData } from './decorators/user-data.decorator';
import { RefreshToken } from './decorators/refresh-token.decorator';
import { Auth } from './decorators/auth.decorator';
import { Role } from './enums/role.enum';

@ApiTags('Аутентификация')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Получить данные о своем профиле' })
  @ApiResponse({ status: HttpStatus.OK, type: User })
  @Auth(Role.USER, Role.STAFF)
  @Get('profile')
  public profile(@RefreshToken() refreshToken: string): Promise<User> {
    return this.authService.profile(refreshToken);
  }

  @ApiOperation({ summary: 'Войти в аккаунт' })
  @ApiResponse({ status: HttpStatus.OK })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  public login(
    @UserData() user: User,
    @Res({ passthrough: true }) response: Response,
  ): Promise<AccessToken> {
    return this.authService.login(user, response);
  }

  @ApiOperation({ summary: 'Зарегистрировать аккаунт' })
  @ApiResponse({ status: HttpStatus.OK })
  @Post('register')
  public register(
    @Body() registerUserDto: RegisterUserDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<AccessToken> {
    return this.authService.register(registerUserDto, response);
  }

  @ApiOperation({ summary: 'Обновить refresh token' })
  @ApiResponse({ status: HttpStatus.OK })
  @Get('refresh')
  public refresh(
    @Res({ passthrough: true }) response: Response,
    @RefreshToken() refreshToken: string,
  ): Promise<AccessToken> {
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
}
