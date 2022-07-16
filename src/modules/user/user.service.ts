import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import type { User } from 'src/interfaces/user.interfaces';

@Injectable()
export class UserService {
  constructor(@Inject('USER_MODEL') private userModel: Model<User>) {}

  async createUser() {
    await this.userModel.create({
      fullname: 'mmd',
    });

    return 'successfully';
  }
}
