import { Module } from '@nestjs/common';
import { TokenServiceImpl } from './token.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from './entities/token.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { TOKEN_SERVICE } from './interfaces/token-service.interface';

@Module({
  imports: [
    TypeOrmModule.forFeature([Token]),
    JwtModule.register({}),
    ConfigModule,
  ],
  providers: [
    {
      useClass: TokenServiceImpl,
      provide: TOKEN_SERVICE,
    },
  ],
  exports: [
    {
      useClass: TokenServiceImpl,
      provide: TOKEN_SERVICE,
    },
  ],
})
export class TokenModule {}
