import { Module } from '@nestjs/common';
import { UserServiceImpl } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { TokensModule } from '../tokens/tokens.module';
import { UserController } from './user.controller';
import { ConfigModule } from '@nestjs/config';
import { USER_SERVICE } from './user-service.interface';

@Module({
  imports: [TypeOrmModule.forFeature([User]), TokensModule, ConfigModule],
  providers: [
    {
      useClass: UserServiceImpl,
      provide: USER_SERVICE,
    },
  ],
  exports: [
    {
      useClass: UserServiceImpl,
      provide: USER_SERVICE,
    },
  ],
  controllers: [UserController],
})
export class UserModule {}
