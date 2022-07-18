import * as mongoose from 'mongoose';
import { IUser } from '../interfaces/user.interfaces';

export const UserSchema = new mongoose.Schema<IUser>({
  fullname: String,
  phone: String,
  email: String,
  password: String,
  active: Boolean,
  firstLogin: Number,
  lastLogin: Number,
  blocked: Boolean,
  refreshToken: String,
  createdAt: Date,
  updatedAt: Date,
});
