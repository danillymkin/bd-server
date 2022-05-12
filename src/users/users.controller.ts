import {
  Controller,
  Get,
  HttpStatus,
  Inject,
  Param,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { FindOneParamsDto } from '../validation/dto/find-one-params.dto';
import { User } from './entities/user.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from '../auth/decorators/auth.decorator';
import { Response } from 'express';
import { USERS_SERVICE } from './users-service.interface';
import { RoleName } from '../role/enum/role-name.enum';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
  constructor(@Inject(USERS_SERVICE) private usersService: UsersService) {}

  @ApiOperation({ summary: 'Получить пользователя по id' })
  @ApiResponse({ status: HttpStatus.OK, type: User })
  @Auth(RoleName.ADMIN)
  @Get(':id')
  public getById(@Param() { id }: FindOneParamsDto): Promise<User> {
    return this.usersService.getById(id);
  }

  @ApiOperation({ summary: 'Подтвердить почту' })
  @Get('activate/:link')
  public activate(
    @Param('link') link: string,
    @Res({ passthrough: true }) response: Response,
  ): Promise<void> {
    return this.usersService.activate(link, response);
  }
}
