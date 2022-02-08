import { Module } from '@nestjs/common';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from './entities/car.entity';
import { Specifications } from './entities/specifications.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Car, Specifications])],
  controllers: [CarsController],
  providers: [CarsService],
})
export class CarsModule {}
