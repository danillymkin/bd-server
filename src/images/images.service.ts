import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from './enities/image.entity';
import { Repository } from 'typeorm';
import { CreateImageDto } from './dto/create-image.dto';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image) private imagesRepository: Repository<Image>,
  ) {}

  async getByCarId() {}

  async create(createImageDto: CreateImageDto) {
    const image = this.imagesRepository.create(createImageDto);
    return await this.imagesRepository.save(image);
  }

  async remove() {}
}
