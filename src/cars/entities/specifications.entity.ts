import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CarBody, CarDrive, CarFuel, CarTransmission } from '../utils/enums';
import { Color } from '../../colors/entities/color.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'specifications' })
export class Specifications {
  @ApiProperty({ example: '1' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: '2017', name: 'Год выпуска' })
  @Column({ nullable: false })
  releaseYear: number;

  @ApiProperty({ example: '32 000', name: 'Пробег' })
  @Column()
  mileage: number;

  @ApiProperty({ enum: CarBody, example: 'Седан', name: 'Кузов' })
  @Column({ type: 'enum', enum: CarBody })
  body: CarBody;

  @ApiProperty({ type: () => Color, name: 'Цвет' })
  @ManyToOne(() => Color, (color: Color) => color.specifications)
  color: Color;

  @ApiProperty({ example: '18 700', name: 'Налог' })
  @Column()
  tax: number;

  @ApiProperty({ example: 'Автоматическая', name: 'Коробка передач' })
  @Column({ type: 'enum', enum: CarTransmission })
  transmission: CarTransmission;

  @ApiProperty({ enum: CarDrive, example: 'Задний', name: 'Привод' })
  @Column({ type: 'enum', enum: CarDrive })
  drive: CarDrive;

  @ApiProperty({ enum: CarFuel, example: 'Дизель', name: 'Тип топлива' })
  @Column({ type: 'enum', enum: CarFuel })
  fuel: CarFuel;

  @ApiProperty({ example: '250', name: 'Мощность л/с' })
  @Column()
  power: number;

  @ApiProperty({ example: '2.0', type: 'float', name: 'Объем двигателя' })
  @Column({ type: 'float' })
  volume: number;
}
