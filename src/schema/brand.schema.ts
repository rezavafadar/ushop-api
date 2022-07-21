import mongoose from 'mongoose';

import { IBrand } from '../interfaces/brands.interfaces';

export const brandSchema = new mongoose.Schema<IBrand>({
  name: String,
});
