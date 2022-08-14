import { Inject, Injectable, BadRequestException } from '@nestjs/common';

import { PRODUCT_MODEL_TOKEN } from '../../constants/index';
import { Model } from 'mongoose';
import { IProduct } from 'src/interfaces/product.interfaces';
import { catchify } from 'src/utils/catchify';

@Injectable()
export class ProductRepo {
  constructor(
    @Inject(PRODUCT_MODEL_TOKEN) private productModel: Model<IProduct>,
  ) {}

  async create(productInfo: IProduct) {
    console.log(productInfo);

    const [product, error] = await catchify<IProduct, any>(async () =>
      this.productModel.create(productInfo),
    );

    // const product = await this.productModel.create({
    //   // attributes:[{}]
    //   specification: [{ name: 'reza', description: 'ree' }],
    // });

    if (error) {
      console.log(error);
      throw new BadRequestException(
        'There is a problem,cannot create user, try again later.',
      );
    }

    return product;
  }
}
