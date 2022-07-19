import { Injectable } from '@nestjs/common';

import { UserRepo } from './user.repo';

@Injectable()
export class UserService {
  constructor(private userRepo: UserRepo) {}

  // async createUser() {
  //   await this.userModel.create({
  //     fullname: 'mmd',
  //   });

  //   return 'successfully';
  // }
}
