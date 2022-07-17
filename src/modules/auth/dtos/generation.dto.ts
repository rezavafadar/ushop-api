import { ApiProperty } from '@nestjs/swagger';

import { VerifyMethod } from '../../../interfaces/auth.interface';

export class OtpGenerationDto {
  @ApiProperty({
    description: 'User Phone number or Email address',
    example: 'example@gmail.com OR +989369441185',
  })
  identifier: string;

  @ApiProperty({
    enum: VerifyMethod,
    example: 'email OR phone',
    description: 'Generation Method',
  })
  method: VerifyMethod;
}
