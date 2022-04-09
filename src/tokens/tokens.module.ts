import { Module } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from './entities/token.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Token]),
    JwtModule.register({}),
    ConfigModule,
  ],
  providers: [TokensService],
  exports: [TokensService],
})
export class TokensModule {}
