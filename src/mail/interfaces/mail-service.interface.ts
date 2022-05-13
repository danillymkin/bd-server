import { SentMessageInfo } from 'nodemailer';

export const MAIL_SERVICE = 'MAIL_SERVICE';

export interface MailService {
  sendActivationMail(to: string, link: string): Promise<SentMessageInfo>;
}
