import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Car } from '../../cars/entities/car.entity';
import { SupplyContract } from '../../supply-contract/entities/supply-contract.entity';

@Entity({ name: 'manufacturers' })
export class Manufacturer {
  @ApiProperty({ example: '1' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'BMW', description: 'Название' })
  @Column()
  name: string;

  @ApiProperty({
    example: 'Москва, Ленинградское шоссе, 39а ст1',
    description: 'Название файла логотипа',
  })
  @Column({ nullable: true })
  logo: string;

  @ApiProperty({
    example: 'Москва, Ленинградское шоссе, 39а ст1',
    description: 'Адрес',
  })
  @Column()
  address: string;

  @ApiProperty({ example: 'Иванов В. В.', description: 'Директор' })
  @Column()
  director: string;

  @ApiProperty({ example: 'Иванов В. В.', description: 'Главный бухгалтер' })
  @Column()
  accountant: string;

  @ApiProperty({ example: '40817810099910004312', description: 'Номер счета' })
  @Column()
  account: string;

  @ApiProperty({ example: '044525974', description: 'БИК' })
  @Column()
  bic: string;

  @ApiProperty({ type: () => [Car], description: 'Список автомобилей' })
  @OneToMany(() => Car, (car: Car) => car.manufacturer, { onDelete: 'CASCADE' })
  cars: Car[];

  @OneToMany(
    () => SupplyContract,
    (supplyContracts: SupplyContract) => supplyContracts.manufacturer,
  )
  supplyContracts: SupplyContract[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
