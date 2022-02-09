import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Car } from './entities/car.entity';
import { UpdateCarDto } from './dto/update-car.dto';
import { CreateCarDto } from './dto/create-car.dto';
import { Specifications } from './entities/specifications.entity';
import { CreateSpecificationsDto } from './dto/create-specifications.dto';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car) private carsRepository: Repository<Car>,
    @InjectRepository(Specifications)
    private specificationsRepository: Repository<Specifications>,
  ) {}

  async getAll(): Promise<Car[]> {
    return await this.carsRepository.find({
      relations: ['specifications', 'specifications.color'],
    });
  }

  async getById(id: number): Promise<Car> {
    return await this.carsRepository.findOne(id, {
      relations: ['specifications', 'specifications.color'],
    });
  }

  async create(createCarDto: CreateCarDto): Promise<Car> {
    const { specifications: specificationsDto, ...carDto } = createCarDto;
    const specifications = await this.createSpecifications(specificationsDto);
    return await this.createCar(carDto, specifications);
  }

  async update(id: number, updateCarDto: UpdateCarDto): Promise<Car> {
    await this.carsRepository.update({ id }, updateCarDto);
    return await this.carsRepository.findOne(id);
  }

  async remove(id: number): Promise<DeleteResult> {
    const car = await this.carsRepository.findOne(id);
    if (!car) {
      throw new NotFoundException();
    }
    await this.specificationsRepository.delete({ id: car.specificationsId });
    return await this.carsRepository.delete(id);
  }

  private async createCar(
    createCarDto: Omit<CreateCarDto, 'specifications'>,
    specifications: Specifications,
  ) {
    const car = this.carsRepository.create(createCarDto);
    car.specifications = specifications;
    await this.carsRepository.save(car);
    return this.carsRepository.findOne(
      { id: car.id },
      {
        relations: ['specifications', 'specifications.color'],
      },
    );
  }

  private async createSpecifications(
    createSpecificationsDto: CreateSpecificationsDto,
  ): Promise<Specifications> {
    const specifications = this.specificationsRepository.create(
      createSpecificationsDto,
    );
    return await this.specificationsRepository.save(specifications);
  }
}
