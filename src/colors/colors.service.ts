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

  async getById(id: string): Promise<Color> {
    return await this.colorsRepository.findOneOrFail(+id);
  }

  async create(createColorDto: CreateColorDto): Promise<Color> {
    const color = this.colorsRepository.create(createColorDto);
    return await this.colorsRepository.save(color);
  }

  async update(id: string, updateColorDto: UpdateColorDto): Promise<Color> {
    await this.colorsRepository.update({ id: +id }, updateColorDto);
    return await this.colorsRepository.findOneOrFail(+id);
  }

  async remove(id: string): Promise<DeleteResult> {
    return await this.colorsRepository.delete({ id: +id });
  }
}
