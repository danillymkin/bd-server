import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarsModule } from './cars/cars.module';
import { ColorsModule } from './colors/colors.module';
import { ManufacturersModule } from './manufacturers/manufacturers.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: +process.env.MYSQL_PORT,
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DB,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
      logger: 'advanced-console',
      logging: ['error', 'query'],
    }),
    CarsModule,
    ColorsModule,
    ManufacturersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
