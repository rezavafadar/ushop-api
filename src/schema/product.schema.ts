import mongoose from 'mongoose';

import { IProduct, IAttribute } from '../interfaces/product.interfaces';

export const productSchema = new mongoose.Schema<IProduct>({
  active: Boolean,
  attributes: [
    new mongoose.Schema<IAttribute>({ name: String, description: String }),
  ],
  inventoryAmount: Number,
  brandsIds: Array,
  categoriesIds: Array,
  expertcheckDescription: String,
  images: Array,
  introduction: String,
  links: Array,
  name: String,
  price: Number,
  specification: [
    new mongoose.Schema<IAttribute>({ name: String, description: String }),
  ],
  subtitle: String,
});
