import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../user/entities/user.entity';

@Entity({ name: 'tokens' })
export class Token {
  @ApiProperty({ example: '1' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Refresh token' })
  @Column()
  refreshToken: string;

  @ApiProperty({ example: 1, description: 'Id пользователя' })
  @Column()
  userId: number;

  @ApiProperty({ type: () => User, description: 'Пользователь' })
  @OneToOne(() => User, (user: User) => user.refreshToken)
  user: User;
}
