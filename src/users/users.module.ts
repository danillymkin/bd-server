import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { TokensModule } from '../tokens/tokens.module';
import { UsersController } from './users.controller';
import { ConfigModule } from '@nestjs/config';
import { USERS_SERVICE } from './users-service.interface';

@Module({
  imports: [TypeOrmModule.forFeature([User]), TokensModule, ConfigModule],
  providers: [
    {
      useClass: UsersService,
      provide: USERS_SERVICE,
    },
  ],
  exports: [
    {
      useClass: UsersService,
      provide: USERS_SERVICE,
    },
  ],
  controllers: [UsersController],
})
export class UsersModule {}
