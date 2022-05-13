import { Manufacturer } from '../entities/manufacturer.entity';
import { CreateManufacturerDto } from '../dto/create-manufacturer.dto';
import { UpdateManufacturerDto } from '../dto/update-manufacturer.dto';
import { DeleteResult } from 'typeorm';

export const MANUFACTURER_SERVICE = 'MANUFACTURER_SERVICE';

export interface ManufacturerService {
  getAll(): Promise<Manufacturer[]>;

  getById(id: number): Promise<Manufacturer>;

  create(createManufacturerDto: CreateManufacturerDto): Promise<Manufacturer>;

  update(
    id: number,
    updateManufacturerDto: UpdateManufacturerDto,
    logo: Express.Multer.File,
  ): Promise<Manufacturer>;

  remove(id: number): Promise<DeleteResult>;
}
