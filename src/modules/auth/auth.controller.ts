import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiForbiddenResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { IGenerationInfo } from '../../interfaces/auth.interface';
import { OtpGenerationDto } from './dtos/generation.dto';

@ApiTags('AUTH')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiBody({ type: OtpGenerationDto })
  @ApiResponse({
    status: 200,
    description: 'Successfully Response.',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Validation Error.',
  })
  @ApiForbiddenResponse({
    status: 403,
    description: 'User Blocked.',
  })
  @Post('/generate')
  async verify(@Body() generationInfo: IGenerationInfo, @Res() res: Response) {
    const { resendTime } = await this.authService.generate(generationInfo);

    res.status(200).json({ message: 'Successfuly!', resendTime });
  }
}
