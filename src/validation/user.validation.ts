import * as joi from 'joi';
import { IUpdateUserInfo } from 'src/interfaces/user.interfaces';
import { validator } from './validator';

// , "Bio's description must be greater then 10 character"
// , "Bio's description must be less then 50 character"
// 'Fullname must be greater then 5 character'
// 'Fullname must be less then 10 character'
export const userInfoValidationSchema = joi
  .object<IUpdateUserInfo>({
    bio: joi.string().min(10).max(50),
    fullname: joi.string().min(5).max(10),
  })
  .required()
  .min(1)
  .options({ allowUnknown: false });

export const validateUserInfo = (data: IUpdateUserInfo) =>
  validator(userInfoValidationSchema, data);
