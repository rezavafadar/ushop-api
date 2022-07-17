import { HttpException } from '@nestjs/common';
import { AnySchema } from 'joi';

export const validator = async (schema: AnySchema, data: any) => {
  try {
    await schema.validateAsync(data, {
      abortEarly: true,
    });
  } catch (error) {
    throw new HttpException(
      {
        title: 'Validation Failed!',
        message: error.details[0].message,
      },
      400,
    );
  }
};
