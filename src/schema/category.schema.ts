import mongoose from 'mongoose';

import { ICategory } from '../interfaces/category.interfaces';

export const categorySchema = new mongoose.Schema<ICategory>({
  name: String,
});
