import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { RoleName } from '../../role/enum/role-name.enum';

@Entity({ name: 'roles' })
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: RoleName })
  name: string;
}
