import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiForbiddenResponse,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { AuthService } from './auth.service';
import {
  IGenerationInfo,
  IRefreshTokenInfo,
  IVerifyInfo,
} from '../../interfaces/auth.interface';
import { OtpGenerationDto } from './dtos/generation.dto';
import { OtpVerifyDto } from './dtos/verifing.dto';
import { RefreshTokenDto } from './dtos/refresh-token.dto';

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
    const { resendTime, identifier, method } = await this.authService.generate(
      generationInfo,
    );

    res
      .status(200)
      .json({ message: 'Successfuly!', resendTime, identifier, method });
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
    const { accessToken, refreshToken, accessTokenExpire } =
      await this.authService.verify(verifyInfo);

    res.status(200).json({
      message: 'Successfuly!',
      accessToken,
      refreshToken,
      accessTokenExpire,
    });
  }

  @ApiBody({
    type: RefreshTokenDto,
  })
  @ApiUnauthorizedResponse({
    description: "Nobody isn't define with this token!",
    status: 401,
  })
  @ApiBadRequestResponse({
    description: 'Token is invalid!',
    status: 400,
  })
  @ApiForbiddenResponse({
    status: 403,
    description: 'Refresh Token expired.',
  })
  @Post('refresh-token')
  async refreshToken(
    @Body() refreshTokenInfo: IRefreshTokenInfo,
    @Res() res: Response,
  ) {
    const { accessToken, accessTokenExpire, refreshToken } =
      await this.authService.refreshToken(refreshTokenInfo);

    res.status(200).json({
      message: 'Successfully!',
      accessToken,
      refreshToken,
      accessTokenExpire,
    });
  }
}
