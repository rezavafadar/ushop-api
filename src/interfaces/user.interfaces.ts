import { Document, Types } from 'mongoose';

import { RoleEnum } from '../enums/role.enum';

export interface IUser {
  readonly _id: Types.ObjectId;
  readonly fullname: string;
  readonly bio: string;
  readonly photo: string;
  readonly phone: string;
  readonly email: string;
  readonly address: string;
  readonly password: string;
  readonly active: boolean;
  readonly role: RoleEnum;
  readonly firstLogin: number;
  readonly lastLogin: number;
  readonly refreshToken: string;
  readonly blocked: boolean;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export interface IUpdateUserInfo {
  readonly fullname?: string;
  readonly bio?: string;
}

export type IUserDoc = IUser & Document;
