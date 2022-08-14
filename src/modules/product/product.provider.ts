import { Connection } from 'mongoose';

import {
  DATABASE_CONNECTION_TOKEN,
  PRODUCT_MODEL_TOKEN,
} from '../../constants/index';
import { productSchema } from '../../schema/product.schema';

export const productProvider = {
  provide: PRODUCT_MODEL_TOKEN,
  useFactory: (connection: Connection) =>
    connection.model('product', productSchema),
  inject: [DATABASE_CONNECTION_TOKEN],
};
