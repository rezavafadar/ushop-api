import {
  Injectable,
  ForbiddenException,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';

import {
  validateOtpGenerate,
  validateOtpVerify,
  validateRefreshToken,
} from '../../validation/auth.validation';
import {
  IGenerationInfo,
  IRefreshTokenInfo,
  IVerifyInfo,
} from '../../interfaces/auth.interface';
import { UserRepo } from '../user/user.repo';
import { IUser } from '../../interfaces/user.interfaces';
import { RESEND_TIME_ACTIVATION_CODE } from '../../constants';
import { OtpStrategy } from './strategies/otp.strategy';
import { EmailService } from '../../common/email/email.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Injectable()
export class AuthService {
  constructor(
    private userRepo: UserRepo,
    private otpStrategy: OtpStrategy,
    private emailService: EmailService,
    private jwtStrategy: JwtStrategy,
  ) {}

  async generate(generationInfo: IGenerationInfo) {
    await validateOtpGenerate(generationInfo);

    const user: IUser = await this.userRepo.findByPhoneOrEmail(
      generationInfo.method,
      generationInfo.identifier,
    );

    if (user && user.blocked) {
      throw new ForbiddenException("You're Blocked!");
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

    return {
      resendTime: RESEND_TIME_ACTIVATION_CODE,
      method: generationInfo.method,
      identifier: generationInfo.identifier,
    };
  }

  async verify(verifyInfo: IVerifyInfo) {
    await validateOtpVerify(verifyInfo);

    const user = await this.userRepo.findByPhoneOrEmail(
      verifyInfo.method,
      verifyInfo.identifier,
    );

    if (!user) throw new UnauthorizedException("User isn't defined!");

    if (user.blocked) throw new ForbiddenException("You're Blocked!");

    await this.otpStrategy.verify(verifyInfo.identifier, verifyInfo.code);

    const { accessToken, refreshToken, accessTokenExpire } =
      this.jwtStrategy.createTokens(user._id);

    await this.userRepo.updateUser(
      { _id: user._id },
      {
        active: true,
        refreshToken,
        lastLogin: Date.now(),
        firstLogin: user.firstLogin ? user.firstLogin : Date.now(),
      },
    );

    return { accessToken, refreshToken, accessTokenExpire };
  }

  async refreshToken(refreshTokenInfo: IRefreshTokenInfo) {
    await validateRefreshToken(refreshTokenInfo);

    const tokenValidation = this.jwtStrategy.validateRefreshToken(
      refreshTokenInfo.refreshToken,
    );

    if (!tokenValidation.valid)
      throw new BadRequestException('Token is invalid!');

    if (Date.now() >= tokenValidation.verifyResult.exp * 1000) {
      throw new ForbiddenException('Token expired!');
    }

    const user = await this.userRepo.findById(
      tokenValidation.verifyResult.userId,
    );

    if (!user || !user.active || user.blocked)
      throw new UnauthorizedException("Nobody isn't define with this token!");

    if (user.refreshToken !== refreshTokenInfo.refreshToken) {
      throw new BadRequestException('Token is invalid!');
    }
    const { accessToken, refreshToken, accessTokenExpire } =
      this.jwtStrategy.createTokens(user._id);
    await this.userRepo.updateUser({ _id: user._id }, { refreshToken });

    return { accessToken, refreshToken, accessTokenExpire };
  }
}
