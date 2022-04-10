import { Module } from '@nestjs/common';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from './entities/car.entity';
import { FilesModule } from '../files/files.module';
import { ImagesModule } from '../images/images.module';

@Module({
  imports: [TypeOrmModule.forFeature([Car]), FilesModule, ImagesModule],
  controllers: [CarsController],
  providers: [CarsService],
})
export class CarsModule {}
