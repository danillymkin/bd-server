import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Specifications } from '../../cars/entities/specifications.entity';

@Entity({ name: 'colors' })
export class Color {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  hex: string;

  @OneToMany(
    () => Specifications,
    (specifications: Specifications) => specifications.color,
  )
  specifications: Specifications[];
}
