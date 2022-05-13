import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Car } from './entities/car.entity';
import { UpdateCarDto } from './dto/update-car.dto';
import { CreateCarDto } from './dto/create-car.dto';
import { AllAndCount } from '../types/all-and-count.type';
import {
  IMAGE_SERVICE,
  ImageService,
} from '../image/interfaces/image-service.interface';
import {
  FILE_SERVICE,
  FileService,
} from '../file/interfaces/file-service.interface';
import { CarService } from './interfaces/car-service.interface';

@Injectable()
export class CarServiceImpl implements CarService {
  constructor(
    @InjectRepository(Car) private carRepository: Repository<Car>,
    @Inject(IMAGE_SERVICE) private imageService: ImageService,
    @Inject(FILE_SERVICE) private fileService: FileService,
  ) {}

  public async getAll(): Promise<AllAndCount<Car>> {
    return await this.carRepository.findAndCount({ relations: ['images'] });
  }

  public async getById(id: number): Promise<Car> {
    return await this.carRepository.findOne(id, { relations: ['images'] });
  }

  public async create(createCarDto: CreateCarDto): Promise<Car> {
    const car = this.carRepository.create(createCarDto);
    await this.carRepository.save(car);
    return await this.carRepository.findOne(car.id);
  }

  public async update(id: number, updateCarDto: UpdateCarDto): Promise<Car> {
    await this.carRepository.update({ id }, updateCarDto);
    return await this.carRepository.findOne(id);
  }

  public async remove(id: number): Promise<DeleteResult> {
    return await this.carRepository.delete(id);
  }

  public async addImages(
    carId: number,
    imageFiles: Array<Express.Multer.File>,
  ): Promise<void | BadRequestException> {
    try {
      imageFiles.map(async (imageFile: Express.Multer.File) => {
        const fileName = await this.fileService.createFile(imageFile);
        await this.imageService.create({ carId, fileName });
      });
    } catch (e) {
      return new BadRequestException({ messages: 'Нет изображений' });
    }
  }
}
