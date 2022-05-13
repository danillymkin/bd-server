import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Car } from './entities/car.entity';
import { UpdateCarDto } from './dto/update-car.dto';
import { CreateCarDto } from './dto/create-car.dto';
import { AllAndCount } from '../types/all-and-count.type';
import { FilesService } from '../files/files.service';
import {
  IMAGE_SERVICE,
  ImageService,
} from '../images/interfaces/image-service.interface';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car) private carRepository: Repository<Car>,
    @Inject(IMAGE_SERVICE) private imageService: ImageService,
    private filesService: FilesService,
  ) {}

  async getAll(): Promise<AllAndCount<Car>> {
    return await this.carRepository.findAndCount({ relations: ['images'] });
  }

  async getById(id: number): Promise<Car> {
    return await this.carRepository.findOne(id, { relations: ['images'] });
  }

  async create(createCarDto: CreateCarDto): Promise<Car> {
    const car = this.carRepository.create(createCarDto);
    await this.carRepository.save(car);
    return await this.carRepository.findOne(car.id);
  }

  async update(id: number, updateCarDto: UpdateCarDto): Promise<Car> {
    await this.carRepository.update({ id }, updateCarDto);
    return await this.carRepository.findOne(id);
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.carRepository.delete(id);
  }

  async addImages(carId: number, imageFiles: Array<Express.Multer.File>) {
    try {
      imageFiles.map(async (imageFile: Express.Multer.File) => {
        const fileName = await this.filesService.createFile(imageFile);
        await this.imageService.create({ carId, fileName });
      });
    } catch (e) {
      return new BadRequestException({ messages: 'Нет изображений' });
    }
  }
}
