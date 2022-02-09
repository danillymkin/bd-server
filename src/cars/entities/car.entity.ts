import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Manufacturer } from '../../manufacturers/entities/manufacturer.entity';
import {
  CarBody,
  CarColor,
  CarDrive,
  CarFuel,
  CarTransmission,
} from '../utils/enums';

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

  @ApiProperty({ example: '2017', description: 'Год выпуска' })
  @Column({ nullable: false })
  releaseYear: number;

  @ApiProperty({ example: '32 000', description: 'Пробег' })
  @Column({ default: 0 })
  mileage: number;

  @ApiProperty({ enum: CarBody, example: 'Седан', description: 'Кузов' })
  @Column({ type: 'enum', enum: CarBody })
  body: CarBody;

  @ApiProperty({ example: 'Черный', description: 'Цвет' })
  @Column({ type: 'enum', enum: CarColor })
  color: CarColor;

  @ApiProperty({ example: '18 700', description: 'Налог' })
  @Column()
  tax: number;

  @ApiProperty({ example: 'Автоматическая', description: 'Коробка передач' })
  @Column({ type: 'enum', enum: CarTransmission })
  transmission: CarTransmission;

  @ApiProperty({ enum: CarDrive, example: 'Задний', description: 'Привод' })
  @Column({ type: 'enum', enum: CarDrive })
  drive: CarDrive;

  @ApiProperty({ enum: CarFuel, example: 'Дизель', description: 'Тип топлива' })
  @Column({ type: 'enum', enum: CarFuel })
  fuel: CarFuel;

  @ApiProperty({ example: '250', description: 'Мощность л/с' })
  @Column()
  power: number;

  @ApiProperty({
    example: '2.0',
    type: 'float',
    description: 'Объем двигателя',
  })
  @Column({ type: 'float' })
  volume: number;

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
