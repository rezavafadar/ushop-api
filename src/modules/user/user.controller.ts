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
import {
  ApiBody,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { memoryStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';

import { UserService } from './user.service';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { IUpdateUserInfo } from 'src/interfaces/user.interfaces';
import { getServerUrl } from '../../utils/get-url';

import { UserInfoDto } from './dtos/user-info.dto';
import { UserProfileDto } from './dtos/user-profile.dto';

@ApiTags('USER')
@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private configService: ConfigService,
  ) {}

  @ApiResponse({
    status: 200,
    description: 'Successfully',
  })
  @ApiUnauthorizedResponse({
    description: "When User isn't defined",
  })
  @Get('/me')
  async getMe(@Req() req: Request, @Res() res: Response) {
    const user: any = req.user;
    const userInfo = await this.userService.getUserInfo(user.userId);

    res.status(200).json({ message: 'Successfully!', data: userInfo });
  }

  @Post('/info')
  @ApiBody({
    type: UserInfoDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully',
  })
  async updateMe(@Req() req: Request, @Res() res: Response) {
    const user: any = req.user;
    const body: IUpdateUserInfo = req.body;

    await this.userService.updateUserInfo(user.userId, body);

    res.status(200).json({ message: 'Successfully!' });
  }

  @Post('/photo')
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: memoryStorage(),
    }),
  )
  @ApiBody({
    type: UserProfileDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Sucessfully!',
  })
  async updateProfilePhoto(
    @UploadedFile()
    profilePhoto: Express.Multer.File,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const user: any = req.user;
    const { filePath } = await this.userService.updateUserPhoto(
      user.userId,
      profilePhoto,
    );

    const url = getServerUrl(req, filePath);

    res.status(200).json({ message: 'Successfully!', url });
  }
}
