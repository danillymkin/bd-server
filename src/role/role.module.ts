import { Module } from '@nestjs/common';
import { RoleServiceImpl } from './role.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { ROLE_SERVICE } from './interfaces/role-service.interface';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  exports: [
    {
      useClass: RoleServiceImpl,
      provide: ROLE_SERVICE,
    },
  ],
  providers: [
    {
      useClass: RoleServiceImpl,
      provide: ROLE_SERVICE,
    },
  ],
})
export class RoleModule {}
