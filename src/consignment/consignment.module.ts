import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Consignment } from './entities/consignment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Consignment])],
})
export class ConsignmentModule {}
