import {
  Controller,
  Get,
  HttpStatus,
  Inject,
  Param,
  Res,
} from '@nestjs/common';
import { FindOneParamsDto } from '../validation/dto/find-one-params.dto';
import { User } from './entities/user.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from '../auth/decorators/auth.decorator';
import { Response } from 'express';
import { USER_SERVICE, UserService } from './interfaces/user-service.interface';
import { RoleName } from '../role/enum/role-name.enum';

@ApiTags('Пользователи')
@Controller('users')
export class UserController {
  constructor(@Inject(USER_SERVICE) private userService: UserService) {}

  @ApiOperation({ summary: 'Получить пользователя по id' })
  @ApiResponse({ status: HttpStatus.OK, type: User })
  @Auth(RoleName.ADMIN)
  @Get(':id')
  public getById(@Param() { id }: FindOneParamsDto): Promise<User> {
    return this.userService.getById(id);
  }

  @ApiOperation({ summary: 'Подтвердить почту' })
  @Get('activate/:link')
  public activate(
    @Param('link') link: string,
    @Res({ passthrough: true }) response: Response,
  ): Promise<void> {
    return this.userService.activate(link, response);
  }
}
