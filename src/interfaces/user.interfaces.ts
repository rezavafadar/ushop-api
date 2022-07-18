import { Document, Types } from 'mongoose';

export interface IUser {
  readonly _id: Types.ObjectId;
  readonly fullname: string;
  readonly phone: string;
  readonly email: string;
  readonly address: string;
  readonly password: string;
  readonly active: boolean;
  readonly firstLogin: number;
  readonly lastLogin: number;
  readonly refreshToken: string;
  readonly blocked: boolean;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export type IUserDoc = IUser & Document;
