import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenDto {
  @ApiProperty({
    description: 'User Refersh Token',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MmQ1NzIyNjQ0MGEzNjg1NGJhZTE3NWMiLCJpYXQiOjE2NTgxNTczNDIsImV4cCI6MTY1ODc2MjE0Mn0.32sKqu9XaurYUkTP1zPbuRaOt62PeajEcYG4eh-tPYI',
  })
  refreshToken: string;
}
