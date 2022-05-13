import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { MailService } from './interfaces/mail-service.interface';
import { SentMessageInfo } from 'nodemailer';

@Injectable()
export class MailServiceImpl implements MailService {
  constructor(
    private mailerService: MailerService,
    private configService: ConfigService,
  ) {}

  async sendActivationMail(to: string, link: string): Promise<SentMessageInfo> {
    const API_URL = this.configService.get<string>('API_URL');
    await this.mailerService.sendMail({
      to,
      subject: `Активация аккаунта на ${API_URL}`,
      html: `
        <div>
          <h1>Для активации перейдите по ссылке</h1>
          <a href='${link}'>${link}</a>
        </div>
      `,
    });
  }
}
