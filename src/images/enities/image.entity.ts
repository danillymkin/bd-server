import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Car } from '../../cars/entities/car.entity';

@Entity({ name: 'images' })
export class Image {
  @ApiProperty({ example: '1' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Имя файла',
    example: 'img.jpg',
  })
  @Column({ type: 'varchar', length: 300 })
  fileName: string;

  @Column()
  carId: number;

  @ApiProperty({ type: () => Car, description: 'Автомобиль' })
  @ManyToOne(() => Car, (car: Car) => car.images)
  car: Car;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
