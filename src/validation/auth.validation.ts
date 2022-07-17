import * as joi from 'joi';

import { validator } from './validator';
import { IGenerationInfo } from '../interfaces/auth.interface';

export const verifyValidationSchema = joi.object({
  method: joi.valid('email', 'phone').required(),
  identifier: joi
    .string()
    .when('method', { is: 'email', then: joi.string().email() })
    .when('method', {
      is: 'phone',
      then: joi.string().pattern(/^(\+98|0)?9\d{9}$/),
    })
    .required(),
});

export const validateOtpVerify = (data: IGenerationInfo) =>
  validator(verifyValidationSchema, data);
