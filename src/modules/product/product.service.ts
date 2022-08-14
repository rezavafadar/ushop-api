import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { validateCreateProductInfo } from 'src/validation/product.validation';
import { IProduct } from '../../interfaces/product.interfaces';
import { UploadService } from '../upload/upload.service';
import { ProductRepo } from './product.repo';

@Injectable()
export class ProductService {
  constructor(
    private productRepo: ProductRepo,
    private uploadService: UploadService,
    private configService: ConfigService,
  ) {}

  async getProduct() {
    console.log('hello mamad!');
  }

  async createProduct(productInfo: IProduct, photos: Express.Multer.File[]) {
    await validateCreateProductInfo(productInfo);

    const productDirectory =
      this.configService.get<string>('PRODUCT_PHOTO_PATH');

    const filenames = photos.map((photo) => `${photo.filename}-${Date.now()}`);

    const product: IProduct = { ...productInfo, active: true };
    Promise.all(
      photos.map((photo) =>
        this.uploadService.uploadFileWithBuffer(
          photo.buffer,
          'jpeg',
          60,
          productDirectory,
          `${photo.filename}-${Date.now()}`,
        ),
      ),
    );

    // add images uploader

    await this.productRepo.create(product);

    console.log(product);
  }
}
