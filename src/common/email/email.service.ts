import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class EmailService {
  constructor(@InjectQueue('email') private emailQueue: Queue) {}

  sendActivationCode(code: string, email: string) {
    if (!code || !email) {
      console.log('Code or Email is undefined!');
      return;
    }

    this.emailQueue.add({ code, email });
  }
}
