import { Document } from 'mongoose';

export interface User extends Document {
  readonly fullname: string;
  readonly phone: string;
  readonly email: string;
  readonly address: string;
  readonly password: string;
  readonly active: boolean;
  readonly firstLogin: Date;
  readonly lastLogin: Date;
  readonly blocked: boolean;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
