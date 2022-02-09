import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CarBody, CarDrive, CarFuel, CarTransmission } from '../utils/enums';
import { Color } from '../../colors/entities/color.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'specifications' })
export class Specifications {
  @ApiProperty({ example: '1' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: '2017', description: 'Год выпуска' })
  @Column({ nullable: false })
  releaseYear: number;

  @ApiProperty({ example: '32 000', description: 'Пробег' })
  @Column({ default: 0 })
  mileage: number;

  @ApiProperty({ enum: CarBody, example: 'Седан', description: 'Кузов' })
  @Column({ type: 'enum', enum: CarBody })
  body: CarBody;

  @ApiProperty({ example: '1', description: 'Id цвета' })
  @Column({ nullable: false })
  colorId: number;

  @ApiProperty({ type: () => Color, description: 'Цвет' })
  @ManyToOne(() => Color, (color: Color) => color.specifications)
  color: Color;

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
}
