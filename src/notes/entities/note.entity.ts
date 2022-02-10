import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Client } from '../../clients/entities/client.entity';

@Entity({ name: 'notes' })
export class Note {
  @ApiProperty({ example: '1' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Краткая заметка', description: 'Текст заметки' })
  @Column({ type: 'mediumtext' })
  text: string;

  @ApiProperty({ example: '1', description: 'Id клиента' })
  @Column()
  clientId: number;

  @ApiProperty({ type: () => Client, description: 'Клиент' })
  @ManyToOne(() => Client, (client: Client) => client.notes)
  client: Client;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
