import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Note } from '../../notes/entities/note.entity';
import { Token } from '../../tokens/entities/token.entity';
import { Exclude } from 'class-transformer';

@Entity({ name: 'users' })
export class User {
  @ApiProperty({ example: '1' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'user@gmail.com', description: 'E-Mail' })
  @Column()
  email: string;

  @ApiProperty({ description: 'Пароль' })
  @Exclude()
  @Column()
  password: string;

  @ApiProperty({ example: true, description: 'Подтверждена ли почта' })
  @Column({ default: false })
  isActivated: boolean;

  @ApiProperty({ description: 'Ссылка для подверждения почты' })
  @Column({ nullable: true })
  activationLink: string;

  @ApiProperty({ type: () => Token, description: 'Refresh token' })
  @OneToOne(() => Token, (refreshToken: Token) => refreshToken.user)
  @JoinColumn()
  refreshToken: Token;

  @ApiProperty({ example: 'Иван', description: 'Имя' })
  @Column()
  firstName: string;

  @ApiProperty({ example: 'Иванов', description: 'Фамилия' })
  @Column()
  lastName: string;

  @ApiProperty({ example: 'Иванович', description: 'Отчество' })
  @Column({ nullable: true })
  patronymic: string;

  @ApiProperty({
    example: 'Москва, Ленинградское шоссе, 39а ст1',
    description: 'Адрес',
  })
  @Column({ nullable: true })
  address: string;

  @ApiProperty({
    example: '+7 (800) 222-33-44',
    description: 'Телефон',
  })
  @Column({ nullable: true })
  phone: string;

  @ApiProperty({
    example: '+7 (800) 222-33-44',
    description: 'Факс',
  })
  @Column({ nullable: true })
  fax: string;

  @ApiProperty({ example: '40817810099910004312', description: 'Номер счета' })
  @Column({ nullable: true })
  account: string;

  @ApiProperty({ type: () => [Note], description: 'Список заметок' })
  @OneToMany(() => Note, (note: Note) => note.user)
  notes: Note[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
