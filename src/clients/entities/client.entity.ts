import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'clients' })
export class Client {
  @ApiProperty({ example: '1' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Иван', description: 'Имя' })
  @Column()
  firstName: string;

  @ApiProperty({ example: 'Иванов', description: 'Фамилия' })
  @Column()
  lastName: string;

  @ApiProperty({ example: 'Иванович', description: 'Отчество' })
  @Column()
  patronymic: string;

  @ApiProperty({
    example: 'Москва, Ленинградское шоссе, 39а ст1',
    description: 'Адрес',
  })
  @Column()
  address: string;

  @ApiProperty({
    example: '+7 (800) 222-33-44',
    description: 'Телефон',
  })
  @Column()
  phone: string;

  @ApiProperty({
    example: '+7 (800) 222-33-44',
    description: 'Факс',
  })
  @Column()
  fax: string;

  @ApiProperty({ description: 'Номер счета' })
  @Column()
  account: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
