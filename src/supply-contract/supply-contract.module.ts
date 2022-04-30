import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupplyContract } from './entities/supply-contract.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SupplyContract])],
})
export class SupplyContractModule {}
