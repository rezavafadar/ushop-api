import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { OtpStrategy } from './strategies/otp.strategy';
import { EmailModule } from '../../common/email/email.module';

@Module({
  imports: [UserModule, EmailModule],
  controllers: [AuthController],
  providers: [AuthService, OtpStrategy],
  exports: [AuthService, OtpStrategy],
})
export class AuthModule {}
