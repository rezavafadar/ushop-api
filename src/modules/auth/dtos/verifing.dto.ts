import { ApiProperty } from '@nestjs/swagger';
import { VerifyMethod } from 'src/interfaces/auth.interface';

export class OtpVerifyDto {
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

  @ApiProperty({
    description: 'Activation code',
    example: '12345',
  })
  code: string;
}
