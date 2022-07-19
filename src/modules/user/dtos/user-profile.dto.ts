import { ApiProperty } from '@nestjs/swagger';

export class UserProfileDto {
  @ApiProperty({
    type: 'form-data',
    description: "User profile photo- it's must into form-data body",
  })
  photo: string;
}
