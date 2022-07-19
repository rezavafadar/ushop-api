import { Injectable } from '@nestjs/common';

import { UserRepo } from './user.repo';
import { dataFilter } from '../../utils/data-filter';
import { NOT_ALLOW_USER_DOCUMENT_KEYS } from '../../constants/index';
import { validateUserInfo } from 'src/validation/user.validation';
import { IUpdateUserInfo } from '../../interfaces/user.interfaces';
import { Types } from 'mongoose';

@Injectable()
export class UserService {
  constructor(private userRepo: UserRepo) {}

  // async createUser() {
  //   await this.userModel.create({
  //     fullname: 'mmd',
  //   });

  //   return 'successfully';
  // }

  async getUserInfo(userId: Types.ObjectId) {
    const user = await this.userRepo.findById(userId);
    const filteredUserData = dataFilter(user, NOT_ALLOW_USER_DOCUMENT_KEYS);

    return filteredUserData;
  }

  async updateUserInfo(userId: Types.ObjectId, data: IUpdateUserInfo) {
    await validateUserInfo(data);

    await this.userRepo.updateUser({ _id: userId }, data);

    return true;
  }

  async updateUserPhoto(userId: Types.ObjectId, photo: Express.Multer.File) {
    console.log(photo.filename);

    const filename = photo.filename;
    await this.userRepo.updateUser({ _id: userId }, { photo: filename });

    return filename;
  }
}
