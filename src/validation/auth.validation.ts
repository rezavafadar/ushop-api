import * as joi from 'joi';

import { validator } from './validator';
import {
  IGenerationInfo,
  IRefreshTokenInfo,
  IVerifyInfo,
} from '../interfaces/auth.interface';
import { activationCodeRange } from '../constants';

const method = joi.valid('email', 'phone').required();
const identifier = joi
  .string()
  .when('method', { is: 'email', then: joi.string().email() })
  .when('method', {
    is: 'phone',
    then: joi.string().pattern(/^(\+98|0)?9\d{9}$/),
  })
  .required();
const code = joi
  .string()
  .min(activationCodeRange)
  .max(activationCodeRange)
  .required();
const refreshToken = joi
  .string()
  .pattern(/^[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*$/)
  .required();

export const generateValidationSchema = joi
  .object({
    method,
    identifier,
  })
  .options({ allowUnknown: false });

export const verifyValidationSchema = joi
  .object({
    identifier,
    method,
    code,
  })
  .options({ allowUnknown: false });

export const refreshValidationSchema = joi
  .object({
    refreshToken,
  })
  .options({ allowUnknown: false });

export const validateOtpGenerate = (data: IGenerationInfo) =>
  validator(generateValidationSchema, data);
export const validateOtpVerify = (data: IVerifyInfo) =>
  validator(verifyValidationSchema, data);
export const validateRefreshToken = (data: IRefreshTokenInfo) =>
  validator(refreshValidationSchema, data);
