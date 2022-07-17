import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import * as nodemailer from 'nodemailer';

@Processor('email')
export class EmailConsumer {
  private mailer: nodemailer.Transporter;
  constructor() {
    this.mailer = nodemailer.createTransport({
      port: 587,
      host: 'smtp.gmail.com',
      auth: {
        user: 'rezaemsender2@gmail.com',
        pass: 'pplgxbfivjuzkpgd',
      },
    });
  }

  @Process()
  async handler(job: Job<any>) {
    this.mailer.sendMail({
      from: 'rezaemsender2@gmail.com',
      to: job.data.email,
      subject: 'UShop: Activation Code',
      text: `You're trying to login into your account! if You aren't, ignore this message please!
      Your activation: ${job.data.code}
      `,
    });
  }
}
