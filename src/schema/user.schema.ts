import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  fullname: String,
  phone: String,
  email: String,
  ADDRESS: {},
  password: String,
  active: Boolean,
  firstLogin: Date,
  lastLogin: Date,
  blocked: Boolean,
  createdAt: Date,
  updatedAt: Date,
});
