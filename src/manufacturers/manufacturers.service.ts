import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Manufacturer } from './entities/manufacturer.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { UpdateManufacturerDto } from './dto/update-manufacturer.dto';
import { Express } from 'express';
import { FilesService } from '../files/files.service';

@Injectable()
export class ManufacturersService {
  constructor(
    @InjectRepository(Manufacturer)
    private manufacturersRepository: Repository<Manufacturer>,
    private filesService: FilesService,
  ) {}

  async getAll(): Promise<Manufacturer[]> {
    return await this.manufacturersRepository.find();
  }

  async getById(id: number): Promise<Manufacturer> {
    return await this.manufacturersRepository.findOne(id);
  }

  async create(
    createManufacturerDto: CreateManufacturerDto,
  ): Promise<Manufacturer> {
    const manufacturer = this.manufacturersRepository.create(
      createManufacturerDto,
    );
    return await this.manufacturersRepository.save(manufacturer);
  }

  async update(
    id: number,
    updateManufacturerDto: UpdateManufacturerDto,
    logo: Express.Multer.File,
  ): Promise<Manufacturer> {
    let fileName: string | null = null;
    if (logo) {
      fileName = await this.filesService.createFile(logo);
    }
    const manufacturer = await this.manufacturersRepository.findOne(id);
    await this.manufacturersRepository.update(
      { id },
      { ...updateManufacturerDto, logo: fileName || manufacturer.logo },
    );
    return await this.manufacturersRepository.findOne(id);
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.manufacturersRepository.delete({ id });
  }
}
