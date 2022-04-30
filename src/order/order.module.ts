import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { CarToOrder } from './entities/car-to-order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, CarToOrder])],
})
export class OrderModule {}
