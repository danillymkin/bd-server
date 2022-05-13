import { AllAndCount } from '../../types/all-and-count.type';
import { Car } from '../entities/car.entity';
import { CreateCarDto } from '../dto/create-car.dto';
import { UpdateCarDto } from '../dto/update-car.dto';
import { DeleteResult } from 'typeorm';
import { BadRequestException } from '@nestjs/common';

export const CAR_SERVICE = 'CAR_SERVICE';

export interface CarService {
  getAll(): Promise<AllAndCount<Car>>;

  getById(id: number): Promise<Car>;

  create(createCarDto: CreateCarDto): Promise<Car>;

  update(id: number, updateCarDto: UpdateCarDto): Promise<Car>;

  remove(id: number): Promise<DeleteResult>;

  addImages(
    carId: number,
    imageFiles: Array<Express.Multer.File>,
  ): Promise<void | BadRequestException>;
}
