import { Inject } from '@nestjs/common';
import { Model, Types } from 'mongoose';

import { IUser } from '../../interfaces/user.interfaces';
import { VerifyMethod } from '../../interfaces/auth.interface';
import { USER_MODEL_TOKEN } from 'src/constants';

export class UserRepo {
  constructor(@Inject(USER_MODEL_TOKEN) private userModel: Model<IUser>) {}

  create(data: Partial<IUser>) {
    return this.userModel.create(data);
  }

  findByPhoneOrEmail(method: VerifyMethod, identifier: string) {
    return this.userModel.findOne({
      [method]: identifier,
    });
  }

  findById(id: Types.ObjectId) {
    return this.userModel.findById(id).lean();
  }

  updateUser(filter: Partial<IUser>, data: Partial<IUser>) {
    return this.userModel.updateOne(filter, {
      $set: data,
    });
  }
}
