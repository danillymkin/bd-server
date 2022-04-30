import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';

@Entity({ name: 'notes' })
export class Note {
  @ApiProperty({ example: '1' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Краткая заметка', description: 'Текст заметки' })
  @Column({ type: 'varchar', length: 1000 })
  text: string;

  @ApiProperty({ example: '1', description: 'Id клиента' })
  @Column()
  userId: number;

  @ApiProperty({ type: () => User, description: 'Клиент' })
  @ManyToOne(() => User, (user: User) => user.notes)
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
