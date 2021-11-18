import { Module } from '@nestjs/common';
import { ProductsController } from './controllers/products.controller';
import { CategoriesController } from './controllers/categories.controller';
import { ProductsService } from 'src/products/services/products.service';

@Module({
  controllers: [ProductsController, CategoriesController],
  providers: [ProductsService],
  exports: [ProductsService]
})
export class ProductsModule {}
