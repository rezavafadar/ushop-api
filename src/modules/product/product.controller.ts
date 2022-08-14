import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ProductService } from './product.service';
import {
  IProduct,
  IProductRequestBody,
} from '../../interfaces/product.interfaces';
import { FilesInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  async getProduct(@Req() req: Request, @Res() res: Response) {
    await this.productService.getProduct();

    res.status(200).json({ message: 'Successfully' });
  }

  @UseInterceptors(
    FilesInterceptor('photos', 5, {
      storage: memoryStorage(),
    }),
  )
  @Post()
  async addProduct(
    @Body() body: IProductRequestBody,
    @UploadedFiles() photos: Express.Multer.File[],
    @Res() res: Response,
  ) {
    console.log(photos);

    const productInfo: IProduct = JSON.parse(body.product);

    await this.productService.createProduct(productInfo, photos);

    res.status(200).json({ message: 'Successfully!' });
  }
}
