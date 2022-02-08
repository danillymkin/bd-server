import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CarBody, CarDrive, CarFuel, CarTransmission } from '../utils/enums';
import { Color } from '../../colors/entities/color.entity';

@Entity({ name: 'specifications' })
export class Specifications {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  releaseYear: number;

  @Column()
  mileage: number;

  @Column({ type: 'enum', enum: CarBody })
  body: CarBody;

  @ManyToOne(() => Color, (color: Color) => color.specifications)
  color: Color;

  @Column()
  tax: number;

  @Column({ type: 'enum', enum: CarTransmission })
  transmission: CarTransmission;

  @Column({ type: 'enum', enum: CarDrive })
  drive: CarDrive;

  @Column({ type: 'enum', enum: CarFuel })
  fuel: CarFuel;

  @Column()
  power: number;

  @Column({ type: 'float' })
  volume: number;
}
