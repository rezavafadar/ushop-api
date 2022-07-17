import { Injectable, HttpException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

import { validateOtpVerify } from '../../validation/auth.validation';
import { IGenerationInfo } from '../../interfaces/auth.interface';
import { UserRepo } from '../user/user.repo';
import { IUser } from '../../interfaces/user.interfaces';
import { RESEND_TIME_ACTIVATION_CODE } from '../../constants';
import { OtpStrategy } from './strategies/otp.strategy';
import { EmailService } from '../../common/email/email.service';

@Injectable()
export class AuthService {
  private mailer: nodemailer.Transporter;

  constructor(
    private userRepo: UserRepo,
    private otpStrategy: OtpStrategy,
    private emailService: EmailService,
  ) {
    this.mailer = nodemailer.createTransport({
      port: 587,
      host: 'smtp.gmail.com',
      auth: {
        user: 'rezaemsender2@gmail.com',
        pass: 'pplgxbfivjuzkpgd',
      },
    });
  }

  async generate(generationInfo: IGenerationInfo) {
    await validateOtpVerify(generationInfo);

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

    // TODO: Otp Strategy
    const { activationCode } = await this.otpStrategy.generate(generationInfo);

    if (generationInfo.method === 'email') {
      // this.emailProducers.activationMail(verifyInfo.identifier, activationCode);
      this.emailService.sendActivationCode(
        activationCode,
        generationInfo.identifier,
      );
      // await this.mailer.sendMail({
      //   from: 'USHOP',
      //   to: generationInfo.identifier,
      //   subject: 'UShop: Activation Code',
      //   text: `You're trying to login into your account! if You aren't, ignore this message please!
      //   Your activation: ${activationCode}
      //   `,
      // });
    } else {
      // need SMS pannel
    }

    return { resendTime: RESEND_TIME_ACTIVATION_CODE };
  }
}
