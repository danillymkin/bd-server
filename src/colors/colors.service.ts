import { Injectable } from '@nestjs/common';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';
import { Color } from './entities/color.entity';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ColorsService {
  constructor(
    @InjectRepository(Color) private colorsRepository: Repository<Color>,
  ) {}

  async getAll(): Promise<Color[]> {
    return await this.colorsRepository.find();
  }

  async getById(id: number): Promise<Color> {
    return await this.colorsRepository.findOne(id);
  }

  async create(createColorDto: CreateColorDto): Promise<Color> {
    const color = this.colorsRepository.create(createColorDto);
    return await this.colorsRepository.save(color);
  }

  async update(id: number, updateColorDto: UpdateColorDto): Promise<Color> {
    await this.colorsRepository.update({ id }, updateColorDto);
    return await this.colorsRepository.findOne(id);
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.colorsRepository.delete({ id });
  }
}
