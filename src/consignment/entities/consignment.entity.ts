import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Car } from '../../cars/entities/car.entity';
import { SupplyContract } from '../../supply-contract/entities/supply-contract.entity';

@Entity({ name: 'consignments' })
export class Consignment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  carId: number;

  @Column({ default: 1 })
  count: number;

  @ManyToOne(
    () => SupplyContract,
    (supplyContract: SupplyContract) => supplyContract.consignment,
  )
  supplyContract: SupplyContract;

  @ManyToOne(() => Car, (car: Car) => car.carToConsignment)
  car: Car;
}
