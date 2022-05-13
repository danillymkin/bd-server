import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FindOneParamsDto } from '../validation/dto/find-one-params.dto';
import { DeleteResult } from 'typeorm';
import { Car } from './entities/car.entity';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { AllAndCount } from '../types/all-and-count.type';
import { onlyImagesFilter } from '../file/filters/only-images.filter';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Auth } from '../auth/decorators/auth.decorator';
import { RoleName } from '../role/enums/role-name.enum';
import { CAR_SERVICE, CarService } from './interfaces/car-service.interface';

@ApiTags('Автомобили')
@Controller('cars')
export class CarController {
  constructor(@Inject(CAR_SERVICE) private carService: CarService) {}

  @ApiOperation({ summary: 'Получить все автомобили' })
  @ApiResponse({ status: HttpStatus.OK, type: [Car] })
  @Get()
  getAll(): Promise<AllAndCount<Car>> {
    return this.carService.getAll();
  }

  @ApiOperation({ summary: 'Получить автомобиль по id' })
  @ApiResponse({ status: HttpStatus.OK, type: Car })
  @Get(':id')
  getById(@Param() { id }: FindOneParamsDto): Promise<Car> {
    return this.carService.getById(id);
  }

  @ApiOperation({ summary: 'Создать автомобиль' })
  @ApiResponse({ status: HttpStatus.CREATED, type: Car })
  @Auth(RoleName.ADMIN)
  @Post()
  create(@Body() createCarDto: CreateCarDto): Promise<Car> {
    return this.carService.create(createCarDto);
  }

  @ApiOperation({ summary: 'Обновить автомобиль' })
  @ApiResponse({ status: HttpStatus.OK, type: Car })
  @Auth(RoleName.ADMIN)
  @Patch(':id')
  update(
    @Param() { id }: FindOneParamsDto,
    @Body() updateCarDto: UpdateCarDto,
  ): Promise<Car> {
    return this.carService.update(id, updateCarDto);
  }

  @ApiOperation({ summary: 'Удалить автомобиль' })
  @ApiResponse({ status: HttpStatus.OK, type: DeleteResult })
  @Auth(RoleName.ADMIN)
  @Delete(':id')
  remove(@Param() { id }: FindOneParamsDto): Promise<DeleteResult> {
    return this.carService.remove(id);
  }

  @UseInterceptors(
    FilesInterceptor('images', 20, {
      fileFilter: onlyImagesFilter,
    }),
  )
  @Auth(RoleName.ADMIN)
  @Post('upload/:id')
  addImages(
    @Param() { id }: FindOneParamsDto,
    @UploadedFiles() images: Array<Express.Multer.File>,
  ): Promise<void | BadRequestException> {
    return this.carService.addImages(id, images);
  }
}
