import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Manufacturer } from '../../manufacturer/entities/manufacturer.entity';
import { Consignment } from '../../consignment/entities/consignment.entity';

@Entity({ name: 'supply_contracts' })
export class SupplyContract {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(
    () => Consignment,
    (consignment: Consignment) => consignment.supplyContract,
  )
  consignment: Consignment;

  @Column()
  manufacturerId: number;

  @ManyToOne(
    () => Manufacturer,
    (manufacturer: Manufacturer) => manufacturer.supplyContracts,
  )
  manufacturer: Manufacturer;

  @Column({ type: 'varchar', length: 1000, nullable: true })
  description: string;

  @Column({ default: false })
  isShipped: boolean;

  @Column({ nullable: true, default: null })
  shippedAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}
