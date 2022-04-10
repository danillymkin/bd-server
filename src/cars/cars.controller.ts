import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FindOneParamsDto } from '../validation/dto/find-one-params.dto';
import { DeleteResult } from 'typeorm';
import { Car } from './entities/car.entity';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { AllAndCount } from '../types/AllAndCount';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { onlyImagesFilter } from '../files/filters/only-images.filter';

@ApiTags('Автомобили')
@Controller('cars')
export class CarsController {
  constructor(private carsService: CarsService) {}

  @ApiOperation({ summary: 'Получить все автомобили' })
  @ApiResponse({ status: HttpStatus.OK, type: [Car] })
  @Get()
  getAll(): Promise<AllAndCount<Car>> {
    return this.carsService.getAll();
  }

  @ApiOperation({ summary: 'Получить автомобиль по id' })
  @ApiResponse({ status: HttpStatus.OK, type: Car })
  @Get(':id')
  getById(@Param() { id }: FindOneParamsDto): Promise<Car> {
    return this.carsService.getById(id);
  }

  @ApiOperation({ summary: 'Создать автомобиль' })
  @ApiResponse({ status: HttpStatus.CREATED, type: Car })
  @Post()
  create(@Body() createCarDto: CreateCarDto): Promise<Car> {
    return this.carsService.create(createCarDto);
  }

  @ApiOperation({ summary: 'Обновить автомобиль' })
  @ApiResponse({ status: HttpStatus.OK, type: Car })
  @Patch(':id')
  update(
    @Param() { id }: FindOneParamsDto,
    @Body() updateCarDto: UpdateCarDto,
  ): Promise<Car> {
    return this.carsService.update(id, updateCarDto);
  }

  @ApiOperation({ summary: 'Удалить автомобиль' })
  @ApiResponse({ status: HttpStatus.OK, type: DeleteResult })
  @Delete(':id')
  remove(@Param() { id }: FindOneParamsDto): Promise<DeleteResult> {
    return this.carsService.remove(id);
  }

  @UseInterceptors(
    FilesInterceptor('images', 20, {
      fileFilter: onlyImagesFilter,
    }),
  )
  @Post('upload/:id')
  addImages(
    @Param() { id }: FindOneParamsDto,
    @UploadedFiles() images: Array<Express.Multer.File>,
  ) {
    return this.carsService.addImages(id, images);
  }
}
