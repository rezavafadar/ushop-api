import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';

import { EmailConsumer } from './email.consumer';
import { EmailService } from './email.service';

@Module({
  imports: [BullModule.registerQueue({ name: 'email' })],
  providers: [EmailService, EmailConsumer],
  exports: [EmailService],
})
export class EmailModule {}
