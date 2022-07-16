import { Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  @Post('/verify')
  async verify(@Req() req: Request, @Res() res: Response) {
    console.log(req);
    res.status(200).json({ message: 'mmd okaye' });
  }
}
