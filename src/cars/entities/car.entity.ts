import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Specifications } from './specifications.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Manufacturer } from '../../manufacturers/entities/manufacturer.entity';

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

  @ApiProperty({ description: 'Описание', example: 'Описание автомобиля' })
  @Column({ type: 'text', nullable: true })
  description: string;

  @Column()
  specificationsId: number;

  @ApiProperty({ type: () => Specifications, description: 'Характеристики' })
  @OneToOne(() => Specifications, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  specifications: Specifications;

  @Column()
  manufacturerId: number;

  @ApiProperty({ type: () => Manufacturer, description: 'Производитель' })
  @ManyToOne(
    () => Manufacturer,
    (manufacturer: Manufacturer) => manufacturer.cars,
    { eager: true },
  )
  manufacturer: Manufacturer;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
