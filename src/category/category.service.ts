/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepo: Repository<Category>
  ){}


  async create(createCategoryDto: CreateCategoryDto) {
    const category=this.categoryRepo.create(
      createCategoryDto
    );
    await this.categoryRepo.save(category)
    return category
  }
  catch(error) {
    throw new InternalServerErrorException(error);
  }

  findAll() {
    const categories=this.categoryRepo.find()
    return categories
  }

  findOne(id: number) {
    const category=this.categoryRepo.findOne({
      where:{
        id,
      }
    })
    if(!category){
      throw new NotFoundException('Categoria con ID: ' + id + ' no encontrado');
    }
    return category;
  }

  async update(id: number, updaateCategoryDto: UpdateCategoryDto) {
    try {
      const category = await this.categoryRepo.preload({
        id,
        ...updaateCategoryDto,
      });
      await this.categoryRepo.save(category);
      return category;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: number) {
    const food = await this.categoryRepo.findOne({
      where: {
        id,
      },
    });
    if (!food) {
      throw new NotFoundException('Categoría con ID: ' + id + ' no encontrado');
    }
    await this.categoryRepo.delete(id);
    return 'Categoría eliminado con exito';
  }

}
