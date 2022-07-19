import { ApiProperty } from '@nestjs/swagger';

export class UserInfoDto {
  @ApiProperty({
    description: 'User Profile Fullname',
    example: 'Reza.Vr',
  })
  fullname: string;

  @ApiProperty({
    example: "I'm reza and i'm 18",
    description: 'User Profile Bio',
  })
  bio: string;
}
