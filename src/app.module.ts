import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarsModule } from './cars/cars.module';
import { ManufacturerModule } from './manufacturer/manufacturer.module';
import { NoteModule } from './note/note.module';
import { ImagesModule } from './images/images.module';
import { FilesModule } from './files/files.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/user.module';
import { TokenModule } from './token/token.module';
import { MailModule } from './mail/mail.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { ConsignmentModule } from './consignment/consignment.module';
import { OrderModule } from './order/order.module';
import { InvoiceModule } from './invoice/invoice.module';
import { SalesContractModule } from './sales-contract/sales-contract.module';
import { SupplyContractModule } from './supply-contract/supply-contract.module';
import { join } from 'path';
import { RoleModule } from './role/role.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        if (process.env.NODE_ENV === 'test') {
          console.log(__dirname);
          return {
            type: 'mysql',
            host: process.env.MYSQL_HOST,
            port: +process.env.MYSQL_PORT,
            username: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DB,
            entities: ['./**/*.entity.ts'],
            synchronize: true,
            dropSchema: true,
            logger: 'simple-console',
            logging: ['error'],
          };
        } else {
          return {
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
          };
        }
      },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'static'),
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.SMTP_HOST,
        port: +process.env.SMTP_PORT,
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      },
      defaults: {
        from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_USER}>`,
      },
      template: {
        adapter: new EjsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    CarsModule,
    ManufacturerModule,
    NoteModule,
    ImagesModule,
    FilesModule,
    AuthModule,
    UserModule,
    TokenModule,
    MailModule,
    ConsignmentModule,
    OrderModule,
    InvoiceModule,
    SalesContractModule,
    SupplyContractModule,
    RoleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
