import { Module } from '@nestjs/common';
import { MailServiceImpl } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';
import { MAIL_SERVICE } from './interfaces/mail-service.interface';

@Module({
  imports: [MailerModule, ConfigModule],
  providers: [
    {
      useClass: MailServiceImpl,
      provide: MAIL_SERVICE,
    },
  ],
  exports: [
    {
      useClass: MailServiceImpl,
      provide: MAIL_SERVICE,
    },
  ],
})
export class MailModule {}
