import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import type { IUser } from '../../interfaces/user.interfaces';

@Injectable()
export class UserService {
  constructor(@Inject('USER_MODEL') private userModel: Model<IUser>) {}

  async createUser() {
    await this.userModel.create({
      fullname: 'mmd',
    });

    return 'successfully';
  }
}
