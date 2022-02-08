import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Specifications } from './specifications.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'cars' })
export class Car {
  @ApiProperty({ example: '1' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'BMW X5', name: 'Название' })
  @Column({ nullable: false })
  name: string;

  @ApiProperty({ example: '6 700 000', name: 'Стоимость' })
  @Column({ default: 0, nullable: false })
  price: number;

  @ApiProperty({ name: 'Описание' })
  @Column({ type: 'text' })
  description: string;

  @ApiProperty({ type: () => Specifications, name: 'Характеристики' })
  @OneToOne(() => Specifications)
  @JoinColumn()
  specifications: Specifications;
}
