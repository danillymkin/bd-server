import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'invoices' })
export class Invoice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  isPaid: boolean;

  @Column({ nullable: true, default: null })
  paidAt: Date;
}
