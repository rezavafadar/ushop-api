import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Types } from 'mongoose';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('ACC_TOKEN_SECRET'),
    });
  }

  validate(payload: any) {
    return { userId: payload.userId };
  }

  createTokens(userId: Types.ObjectId) {
    const accessToken = this.jwtService.sign(
      { userId },
      {
        secret: this.configService.get('ACC_TOKEN_SECRET'),
        expiresIn: this.configService.get('ACC_TOKEN_EXPIRE'),
      },
    );
    const refreshToken = this.jwtService.sign(
      { userId },
      {
        secret: this.configService.get('REF_TOKEN_SECRET'),
        expiresIn: this.configService.get('REF_TOKEN_EXPIRE'),
      },
    );

    return {
      refreshToken,
      accessToken,
      accessTokenExpire: this.configService.get('ACC_TOKEN_EXPIRE'),
    };
  }

  validateRefreshToken(token: string) {
    try {
      const verifyResult: any = this.jwtService.verify(token, {
        secret: this.configService.get('REF_TOKEN_SECRET'),
      });
      return { valid: true, verifyResult };
    } catch (error) {
      console.log('Refresh-token Err: ', error);

      return { valid: false };
    }
  }
}
