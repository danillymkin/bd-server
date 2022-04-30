import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalesContract } from './entities/sales-contract.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SalesContract])],
})
export class SalesContractModule {}
