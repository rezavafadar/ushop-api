import { Injectable, HttpException } from '@nestjs/common';

import {
  validateOtpGenerate,
  validateOtpVerify,
} from '../../validation/auth.validation';
import { IGenerationInfo, IVerifyInfo } from '../../interfaces/auth.interface';
import { UserRepo } from '../user/user.repo';
import { IUser } from '../../interfaces/user.interfaces';
import { RESEND_TIME_ACTIVATION_CODE } from '../../constants';
import { OtpStrategy } from './strategies/otp.strategy';
import { EmailService } from '../../common/email/email.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userRepo: UserRepo,
    private otpStrategy: OtpStrategy,
    private emailService: EmailService,
    private jwtService: JwtService,
  ) {}

  async generate(generationInfo: IGenerationInfo) {
    await validateOtpGenerate(generationInfo);

    const user: IUser = await this.userRepo.findByPhoneOrEmail(
      generationInfo.method,
      generationInfo.identifier,
    );

    if (user && user.blocked) {
      throw new HttpException("You're Blocked!", 403);
    }

    if (!user) {
      await this.userRepo.create({
        [generationInfo.method]: generationInfo.identifier,
        active: false,
      });
    }

    const { activationCode } = await this.otpStrategy.generate(generationInfo);

    if (generationInfo.method === 'email') {
      this.emailService.sendActivationCode(
        activationCode,
        generationInfo.identifier,
      );
    } else {
      // need SMS pannel
    }

    return { resendTime: RESEND_TIME_ACTIVATION_CODE };
  }

  async verify(verifyInfo: IVerifyInfo) {
    await validateOtpVerify(verifyInfo);

    const user = await this.userRepo.findByPhoneOrEmail(
      verifyInfo.method,
      verifyInfo.identifier,
    );

    if (!user) throw new HttpException("User isn't defined!", 401);

    if (user.blocked) throw new HttpException("You're Blocked!", 403);

    await this.otpStrategy.verify(verifyInfo.identifier, verifyInfo.code);

    await this.userRepo.activatedUserById(user.id);

    const token = this.jwtService.sign({ id: user._id });

    return { token };
  }
}
