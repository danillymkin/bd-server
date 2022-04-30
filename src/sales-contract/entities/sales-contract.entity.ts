import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Invoice } from '../../invoice/entities/invoice.entity';
import { User } from '../../users/entities/user.entity';

@Entity({ name: 'sales_contracts' })
export class SalesContract {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  invoiceId: number;

  @OneToOne(() => Invoice)
  @JoinColumn()
  invoice: Invoice;

  @Column()
  customerId: number;

  @ManyToOne(() => User, (customer: User) => customer.salesContracts)
  customer: User;

  @Column()
  employeeId: number;

  @ManyToOne(() => User, (employee: User) => employee.salesContracts)
  employee: User;

  @Column({ type: 'varchar', length: 1000, nullable: true })
  description: string;

  @Column({ default: false })
  isShipped: boolean;

  @Column({ nullable: true, default: null })
  shippedAt: Date;

  @CreateDateColumn()
  createdAt: Date;
}
