import { Module } from '@nestjs/common';
import { ManufacturerController } from './manufacturer.controller';
import { ManufacturerServiceImpl } from './manufacturer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Manufacturer } from './entities/manufacturer.entity';
import { FileModule } from '../file/file.module';
import { MANUFACTURER_SERVICE } from './interfaces/manufacturer-service.interface';

@Module({
  imports: [TypeOrmModule.forFeature([Manufacturer]), FileModule],
  controllers: [ManufacturerController],
  providers: [
    {
      useClass: ManufacturerServiceImpl,
      provide: MANUFACTURER_SERVICE,
    },
  ],
})
export class ManufacturerModule {}
