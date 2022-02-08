import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Specifications } from './specifications.entity';

@Entity({ name: 'cars' })
export class Car {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ default: 0, nullable: false })
  price: number;

  @Column({ type: 'text' })
  description: string;

  @OneToOne(() => Specifications)
  @JoinColumn()
  specifications: Specifications;
}
