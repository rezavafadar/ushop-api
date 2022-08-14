import * as joi from 'joi';
import mongoose from 'mongoose';

import { IAttribute, IProduct } from '../interfaces/product.interfaces';
import { validator } from './validator';

const mongoObjectidValidator = (value: any, helpers: any) => {
  if (!mongoose.isValidObjectId(value)) {
    return helpers.error('mongo.objectid.invalid');
  }

  return value;
};

const createProductValidationSchema = joi
  .object<IProduct>({
    attributes: joi
      .array()
      .items(
        joi.object<IAttribute>({
          description: joi.string().required(),
          name: joi.string().min(4).max(20).required(),
        }),
      )
      .min(1)
      .max(5),
    //   available: joi.boolean(),
    inventoryAmount: joi.number().min(1).required(),
    brandsIds: joi
      .array()
      .items(
        joi
          .string()
          .custom(mongoObjectidValidator, 'mongo objectId validation'),
      )
      .messages({ 'mongo.objectid.invalid': 'ids are invalid' })
      .min(1),
    categoriesIds: joi
      .array()
      .items(
        joi
          .string()
          .custom(mongoObjectidValidator, 'mongo objectId validation'),
      )
      .messages({ 'mongo.objectid.invalid': 'ids are invalid' })
      .min(1),
    expertcheckDescription: joi.string(),
    introduction: joi.string().required(),
    links: joi.array().items(joi.string()),
    name: joi.string().required(),
    price: joi.number().required(),
    specification: joi
      .array()
      .items(
        joi.object<IAttribute>({
          description: joi.string().required(),
          name: joi.string().min(4).max(20).required(),
        }),
      )
      .min(1)
      .required(),
    subtitle: joi.string(),
  })
  .options({ allowUnknown: false });

export const validateCreateProductInfo = (data: IProduct) =>
  validator(createProductValidationSchema, data);
