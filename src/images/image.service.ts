import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from './enities/image.entity';
import { Repository } from 'typeorm';
import { CreateImageDto } from './dto/create-image.dto';
import { ImageService } from './interfaces/image-service.interface';

@Injectable()
export class ImageServiceImpl implements ImageService {
  constructor(
    @InjectRepository(Image) private imageRepository: Repository<Image>,
  ) {}

  async create(createImageDto: CreateImageDto): Promise<Image> {
    const image = this.imageRepository.create(createImageDto);
    return await this.imageRepository.save(image);
  }
}
