import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';

import { AuthService } from './auth.service';
import { IGenerationInfo } from '../../interfaces/auth.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/generate')
  async verify(@Body() generationInfo: IGenerationInfo, @Res() res: Response) {
    const { resendTime } = await this.authService.generate(generationInfo);

    res.status(200).json({ message: 'Successfuly!', resendTime });
  }
}
