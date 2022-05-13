import { Module } from '@nestjs/common';
import { CarController } from './car.controller';
import { CarServiceImpl } from './car.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from './entities/car.entity';
import { FileModule } from '../file/file.module';
import { ImageModule } from '../image/image.module';
import { CAR_SERVICE } from './interfaces/car-service.interface';

@Module({
  imports: [TypeOrmModule.forFeature([Car]), FileModule, ImageModule],
  controllers: [CarController],
  providers: [
    {
      useClass: CarServiceImpl,
      provide: CAR_SERVICE,
    },
  ],
})
export class CarModule {}
