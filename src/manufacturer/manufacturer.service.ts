import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Manufacturer } from './entities/manufacturer.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { UpdateManufacturerDto } from './dto/update-manufacturer.dto';
import { ManufacturerService } from './interfaces/manufacturer-service.interface';
import {
  FILE_SERVICE,
  FileService,
} from '../files/interfaces/file-service.interface';

@Injectable()
export class ManufacturerServiceImpl implements ManufacturerService {
  constructor(
    @InjectRepository(Manufacturer)
    private manufacturerRepository: Repository<Manufacturer>,
    @Inject(FILE_SERVICE) private fileService: FileService,
  ) {}

  public async getAll(): Promise<Manufacturer[]> {
    return await this.manufacturerRepository.find();
  }

  public async getById(id: number): Promise<Manufacturer> {
    return await this.manufacturerRepository.findOne(id);
  }

  public async create(
    createManufacturerDto: CreateManufacturerDto,
  ): Promise<Manufacturer> {
    const manufacturer = this.manufacturerRepository.create(
      createManufacturerDto,
    );
    return await this.manufacturerRepository.save(manufacturer);
  }

  public async update(
    id: number,
    updateManufacturerDto: UpdateManufacturerDto,
    logo: Express.Multer.File,
  ): Promise<Manufacturer> {
    let fileName: string | null = null;
    if (logo) {
      fileName = await this.fileService.createFile(logo);
    }
    const manufacturer = await this.manufacturerRepository.findOne(id);
    await this.manufacturerRepository.update(
      { id },
      { ...updateManufacturerDto, logo: fileName || manufacturer.logo },
    );
    return await this.manufacturerRepository.findOne(id);
  }

  public async remove(id: number): Promise<DeleteResult> {
    return await this.manufacturerRepository.delete({ id });
  }
}
