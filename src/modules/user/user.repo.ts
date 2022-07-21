import { BadRequestException, Inject } from '@nestjs/common';
import { Model, Types } from 'mongoose';

import { IUser } from '../../interfaces/user.interfaces';
import { VerifyMethod } from '../../interfaces/auth.interface';
import { USER_MODEL_TOKEN } from 'src/constants';
import { catchify } from 'src/utils/catchify';

export class UserRepo {
  constructor(@Inject(USER_MODEL_TOKEN) private userModel: Model<IUser>) {}

  async create(data: Partial<IUser>) {
    const [user, error] = await catchify<IUser, any>(async () =>
      this.userModel.create(data),
    );

    if (error) {
      throw new BadRequestException(
        'There is a problem,cannot create user, try again later.',
      );
    }

    return user;
  }

  async findByPhoneOrEmail(method: VerifyMethod, identifier: string) {
    const [user, error] = await catchify<IUser, any>(async () =>
      this.userModel.findOne({
        [method]: identifier,
      }),
    );

    if (error) {
      throw new BadRequestException('There is a problem, try again later.');
    }

    return user;
  }

  async findById(id: Types.ObjectId) {
    const [user, error] = await catchify<IUser, any>(async () =>
      this.userModel.findById(id).lean(),
    );
    if (error) {
      throw new BadRequestException('There is a problem, try again later.');
    }

    return user;
  }

  async updateUser(filter: Partial<IUser>, data: Partial<IUser>) {
    const [updateInfo, error] = await catchify(async () =>
      this.userModel.updateOne(filter, {
        $set: data,
      }),
    );

    if (error) {
      throw new BadRequestException(
        'There is a problem, cannot update user info. try again later,please.',
      );
    }
    return updateInfo;
  }
}
