import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Specifications } from '../../cars/entities/specifications.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'colors' })
export class Color {
  @ApiProperty({ example: '1' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Черный', description: 'Название цвета' })
  @Column({ nullable: false })
  name: string;

  @ApiProperty({ example: '#000000', description: 'HEX код цвета' })
  @Column({ nullable: false })
  hex: string;

  @ApiProperty({
    type: () => [Specifications],
    name: 'Список характеристик авто',
  })
  @OneToMany(
    () => Specifications,
    (specifications: Specifications) => specifications.color,
  )
  specifications: Specifications[];
}
