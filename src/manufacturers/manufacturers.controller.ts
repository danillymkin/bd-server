import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FindOneParamsDto } from '../validation/dto/find-one-params.dto';
import { DeleteResult } from 'typeorm';
import { ManufacturersService } from './manufacturers.service';
import { Manufacturer } from './entities/manufacturer.entity';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { UpdateManufacturerDto } from './dto/update-manufacturer.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { onlyImagesFilter } from '../files/filters/only-images.filter';
import { Auth } from '../auth/decorators/auth.decorator';
import { RoleName } from '../role/enums/role-name.enum';

@ApiTags('Производители')
@Controller('manufacturers')
export class ManufacturersController {
  constructor(private manufacturersService: ManufacturersService) {}

  @ApiOperation({ summary: 'Получить всех производителей' })
  @ApiResponse({ status: HttpStatus.OK, type: [Manufacturer] })
  @Get()
  getAll(): Promise<Manufacturer[]> {
    return this.manufacturersService.getAll();
  }

  @ApiOperation({ summary: 'Получить производителя по id' })
  @ApiResponse({ status: HttpStatus.OK, type: Manufacturer })
  @Get(':id')
  getById(@Param() { id }: FindOneParamsDto): Promise<Manufacturer> {
    return this.manufacturersService.getById(id);
  }

  @ApiOperation({ summary: 'Создать производителя' })
  @ApiResponse({ status: HttpStatus.CREATED, type: Manufacturer })
  @Auth(RoleName.ADMIN)
  @Post()
  create(
    @Body() createManufacturerDto: CreateManufacturerDto,
  ): Promise<Manufacturer> {
    return this.manufacturersService.create(createManufacturerDto);
  }

  @ApiOperation({ summary: 'Обновить производителя' })
  @ApiResponse({ status: HttpStatus.OK, type: Manufacturer })
  @UseInterceptors(FileInterceptor('logo', { fileFilter: onlyImagesFilter }))
  @Auth(RoleName.ADMIN)
  @Patch(':id')
  update(
    @Param() { id }: FindOneParamsDto,
    @Body() updateManufacturerDto: UpdateManufacturerDto,
    @UploadedFile() logo: Express.Multer.File,
  ): Promise<Manufacturer> {
    return this.manufacturersService.update(id, updateManufacturerDto, logo);
  }

  @ApiOperation({ summary: 'Удалить производителя' })
  @ApiResponse({ status: HttpStatus.OK, type: DeleteResult })
  @Auth(RoleName.ADMIN)
  @Delete(':id')
  remove(@Param() { id }: FindOneParamsDto): Promise<DeleteResult> {
    return this.manufacturersService.remove(id);
  }
}
