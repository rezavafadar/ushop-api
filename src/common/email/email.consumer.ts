import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Processor('email')
export class EmailConsumer {
  private mailer: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    this.mailer = nodemailer.createTransport({
      port: Number(configService.get('MAILER_PORT')),
      host: this.configService.get('MAILER_HOST'),
      auth: {
        user: this.configService.get('MAILER_USER'),
        pass: this.configService.get('MAILER_PASS'),
      },
    });
  }

  @Process()
  async handler(job: Job<any>) {
    this.mailer.sendMail({
      from: this.configService.get('MAILER_USER'),
      to: job.data.email,
      subject: 'UShop: Activation Code',
      text: `You're trying to login into your account! if You aren't, ignore this message please!
      Your activation: ${job.data.code}
      `,
    });
  }
}
