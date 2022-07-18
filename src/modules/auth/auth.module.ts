import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { OtpStrategy } from './strategies/otp.strategy';
import { EmailModule } from '../../common/email/email.module';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [UserModule, EmailModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, OtpStrategy, JwtStrategy],
  exports: [AuthService, OtpStrategy, JwtStrategy],
})
export class AuthModule {}
