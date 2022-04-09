import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [MailerModule, ConfigModule],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
