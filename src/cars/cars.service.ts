import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Car } from './entities/car.entity';
import { UpdateCarDto } from './dto/update-car.dto';
import { CreateCarDto } from './dto/create-car.dto';

@Injectable()
export class CarsService {
  constructor(@InjectRepository(Car) private carsRepository: Repository<Car>) {}

  async getAll(): Promise<Car[]> {
    return await this.carsRepository.find();
  }

  async getById(id: number): Promise<Car> {
    return await this.findOneOrNotFound(id);
  }

  async create(createCarDto: CreateCarDto): Promise<Car> {
    const car = this.carsRepository.create(createCarDto);
    await this.carsRepository.save(car);
    return await this.carsRepository.findOne(car.id);
  }

  async update(id: number, updateCarDto: UpdateCarDto): Promise<Car> {
    await this.carsRepository.update({ id }, updateCarDto);
    return await this.carsRepository.findOne(id);
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.carsRepository.delete(id);
  }

  private async findOneOrNotFound(id: number): Promise<Car> {
    const car = await this.carsRepository.findOne({ id });
    if (!car) {
      throw new NotFoundException();
    }
    return car;
  }
}
