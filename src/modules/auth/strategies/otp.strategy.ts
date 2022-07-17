import {
  CACHE_MANAGER,
  Inject,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { Cache } from 'cache-manager';

import { RESEND_TIME_ACTIVATION_CODE } from '../../../constants';
import { IGenerationInfo } from '../../../interfaces/auth.interface';

@Injectable()
export class OtpStrategy {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  private generateCode(range = 5) {
    const litters = '1326458790';
    let code = '';

    for (let i = 1; i <= range; i++) {
      const random = Math.floor(Math.random() * 10);
      code += litters[random];
    }

    return code;
  }

  async generate(generationInfo: IGenerationInfo) {
    const currentActivationCode: any = JSON.parse(
      await this.cacheManager.get(generationInfo.identifier),
    );

    if (currentActivationCode) {
      if (currentActivationCode.lastSendTime > new Date().getTime()) {
        throw new HttpException('Activation code is exists.', 400);
      }
      await this.cacheManager.del(generationInfo.identifier);
    }

    const activationCode = this.generateCode();

    const resendTime = new Date();
    resendTime.setSeconds(
      resendTime.getSeconds() + RESEND_TIME_ACTIVATION_CODE,
    );

    await this.cacheManager.set(
      generationInfo.identifier,
      JSON.stringify({
        code: activationCode,
        lastSendTime: resendTime.getTime(),
      }),
      { ttl: 300 },
    );

    return { activationCode };
  }
}
