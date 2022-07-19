import {
  Controller,
  Get,
  Post,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { UserService } from './user.service';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { IUpdateUserInfo } from 'src/interfaces/user.interfaces';
import { FileInterceptor } from '@nestjs/platform-express';
import { getServerUrl } from '../../utils/get-url';
import { ConfigService } from '@nestjs/config';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private configService: ConfigService,
  ) {}

  // @Post('create')
  // async createUser() {
  //   await this.userService.createUser();
  //   return 'kh';
  // }

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  async getMe(@Req() req: Request, @Res() res: Response) {
    const user: any = req.user;
    const userInfo = await this.userService.getUserInfo(user.userId);

    res.status(200).json({ message: 'Successfully!', data: userInfo });
  }

  @UseGuards(JwtAuthGuard)
  @Post('/info')
  async updateMe(@Req() req: Request, @Res() res: Response) {
    const user: any = req.user;
    const body: IUpdateUserInfo = req.body;

    await this.userService.updateUserInfo(user.userId, body);

    res.status(200).json({ message: 'Successfully!' });
  }

  @UseInterceptors(
    FileInterceptor('photo', {
      dest: 'uploads/user/photo',
    }),
  )
  @Post('/photo')
  async updateProfilePhoto(
    @UploadedFile() profilePhoto: Express.Multer.File,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const user: any = req.user;
    const filename = await this.userService.updateUserPhoto(
      user.userId,
      profilePhoto,
    );

    const url = getServerUrl(
      req,
      this.configService.get('USER_PHOTO_PATH'),
      filename,
    );

    res.status(200).json({ message: 'Successfully!', url });
  }
}
