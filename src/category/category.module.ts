import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, CloudinaryService],
  imports: [TypeOrmModule.forFeature([Category])],
})
export class CategoryModule {}
