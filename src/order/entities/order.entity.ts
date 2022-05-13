import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CarToOrder } from './car-to-order.entity';
import { User } from '../../user/entities/user.entity';

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @ManyToOne(() => User, (user: User) => user.orders)
  user: User;

  @OneToMany(() => CarToOrder, (carToOrder: CarToOrder) => carToOrder.order)
  carToOrder: CarToOrder[];
}
