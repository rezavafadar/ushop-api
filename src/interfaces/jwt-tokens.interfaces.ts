import { RoleEnum } from '../enums/role.enum';
import { Types } from 'mongoose';

export interface IJwtTokenPayload {
  userId: Types.ObjectId;
  role: RoleEnum;
}
