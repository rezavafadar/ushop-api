import { Inject } from '@nestjs/common';
import { Model } from 'mongoose';

import { IUser } from '../../interfaces/user.interfaces';
import { VerifyMethod } from '../../interfaces/auth.interface';

export class UserRepo {
  constructor(@Inject('USER_MODEL') private userModel: Model<IUser>) {}

  create(data: Partial<IUser>) {
    return this.userModel.create(data);
  }

  findByPhoneOrEmail(method: VerifyMethod, identifier: string) {
    return this.userModel.findOne({
      [method]: identifier,
    });
  }

  activatedUserById(id: string) {
    return this.userModel.updateOne(
      { _id: id },
      {
        $set: {
          active: true,
        },
      },
    );
  }
}
