import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(@InjectRepository(Category)
  private categoryRepository: Repository<Category>) {}

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const category = this.categoryRepository.create(createCategoryDto);
      await this.categoryRepository.save(category);
      return category;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll() {
    try {
      const categories = await this.categoryRepository.find();
      return categories;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  findOne(id: number) {
    const category = this.categoryRepository.findOne({
      where: { id }
    });
    if (!category){
      throw new NotFoundException(`Element with id ${id} not found.`); 
    }
    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    try {
      const category = await this.categoryRepository.preload({
        id,
        ...updateCategoryDto
      });
      await this.categoryRepository.save(category);
      return category;
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async remove(id: number) {
    const category = await this.categoryRepository.findOne({
      where:{
        id
      }
    });
    if (!category) {
      throw new NotFoundException('La categoria con el id ' + id + ' no se encontro');
    }else{
      await this.categoryRepository.delete(id);
      return `Element with id ${id} has been deleted.`;
    }
  }
}
