import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Types } from 'mongoose';

import { UserRepo } from './user.repo';
import { dataFilter } from '../../utils/data-filter';
import {
  NOT_ALLOW_USER_DOCUMENT_KEYS,
  USER_PHOTO_FORMMAT,
} from '../../constants/index';
import { validateUserInfo } from 'src/validation/user.validation';
import { IUpdateUserInfo } from '../../interfaces/user.interfaces';
import { ConfigService } from '@nestjs/config';
import { UploadService } from '../upload/upload.service';

@Injectable()
export class UserService {
  constructor(
    private userRepo: UserRepo,
    private configService: ConfigService,
    private uploadService: UploadService,
  ) {}

  async getUserInfo(userId: Types.ObjectId) {
    const user = await this.userRepo.findById(userId);

    if (!user) throw new UnauthorizedException("User isn't defined!");

    const filteredUserData = dataFilter(user, NOT_ALLOW_USER_DOCUMENT_KEYS);

    return filteredUserData;
  }

  async updateUserInfo(userId: Types.ObjectId, data: IUpdateUserInfo) {
    await validateUserInfo(data);

    await this.userRepo.updateUser({ _id: userId }, data);

    return true;
  }

  async updateUserPhoto(userId: Types.ObjectId, photo: Express.Multer.File) {
    const user = await this.userRepo.findById(userId);

    if (!user) throw new UnauthorizedException("User isn't defined!");

    const userPhotoDirectory = this.configService.get('USER_PHOTO_PATH');

    if (user.photo) {
      await this.uploadService.deleteFile(userPhotoDirectory, user.photo);
    }

    const filename = `${userId}-${Date.now()}.${USER_PHOTO_FORMMAT}`;

    const { filePath } = await this.uploadService.uploadFileWithBuffer(
      photo.buffer,
      USER_PHOTO_FORMMAT,
      60,
      userPhotoDirectory,
      filename,
    );

    await this.userRepo.updateUser({ _id: userId }, { photo: filename });

    return { filePath };
  }
}
