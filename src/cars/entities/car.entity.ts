import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Specifications } from './specifications.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'cars' })
export class Car {
  @ApiProperty({ example: '1' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'BMW X5', description: 'Название' })
  @Column({ nullable: false })
  name: string;

  @ApiProperty({ example: '6 700 000', description: 'Стоимость' })
  @Column({ default: 0, nullable: false })
  price: number;

  @ApiProperty({ name: 'Описание' })
  @Column({ type: 'text', nullable: true })
  description: string;

  @Column()
  specificationsId: number;

  @ApiProperty({ type: () => Specifications, description: 'Характеристики' })
  @OneToOne(() => Specifications, { onDelete: 'CASCADE' })
  @JoinColumn()
  specifications: Specifications;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
