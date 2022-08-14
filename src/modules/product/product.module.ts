import { Module } from '@nestjs/common';

import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductRepo } from './product.repo';
import { productProvider } from './product.provider';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ProductController],
  providers: [ProductService, ProductRepo, productProvider],
  exports: [ProductService, ProductRepo],
})
export class ProductModule {}
