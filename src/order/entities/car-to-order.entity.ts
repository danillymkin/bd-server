import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Car } from '../../car/entities/car.entity';
import { Order } from './order.entity';

@Entity({ name: 'car_to_order' })
export class CarToOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  orderId: number;

  @Column()
  carId: number;

  @Column({ default: 1 })
  count: number;

  @Column()
  price: number;

  @ManyToOne(() => Order, (order: Order) => order.carToOrder)
  order: Order;

  @ManyToOne(() => Car, (car: Car) => car.carToOrder)
  car: Car;

  @CreateDateColumn()
  createdAt: Date;
}
