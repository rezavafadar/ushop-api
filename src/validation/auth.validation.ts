import * as joi from 'joi';

import { validator } from './validator';
import { IGenerationInfo, IVerifyInfo } from '../interfaces/auth.interface';
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

export const generateValidationSchema = joi.object({
  method,
  identifier,
});

export const verifyValidationSchema = joi.object({
  identifier,
  method,
  code,
});

export const validateOtpGenerate = (data: IGenerationInfo) =>
  validator(generateValidationSchema, data);
export const validateOtpVerify = (data: IVerifyInfo) =>
  validator(verifyValidationSchema, data);
