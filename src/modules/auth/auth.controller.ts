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
import { IGenerationInfo, IVerifyInfo } from '../../interfaces/auth.interface';
import { OtpGenerationDto, OtpVerifyDto } from './dtos/generation.dto';

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
  async generate(
    @Body() generationInfo: IGenerationInfo,
    @Res() res: Response,
  ) {
    const { resendTime } = await this.authService.generate(generationInfo);

    res.status(200).json({ message: 'Successfuly!', resendTime });
  }

  @ApiBody({ type: OtpVerifyDto })
  @ApiResponse({
    status: 200,
    description: 'Successfully Response.',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Validation Error.',
  })
  @ApiResponse({
    status: 400,
    description: "Activation Code isn't exists!.",
  })
  @ApiResponse({
    status: 400,
    description: "Activation Code isn't correct or expired.",
  })
  @ApiResponse({
    status: 401,
    description: "User isn't defined!",
  })
  @ApiForbiddenResponse({
    status: 403,
    description: 'User Blocked.',
  })
  @Post('/verify')
  async verify(@Body() verifyInfo: IVerifyInfo, @Res() res: Response) {
    await this.authService.verify(verifyInfo);

    res.status(200).json({ message: 'Successfuly!' });
  }
}
