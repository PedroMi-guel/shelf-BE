import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Like, Repository } from 'typeorm';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class CategoryService {
  constructor(@InjectRepository(Category)
  private categoryRepository: Repository<Category>,
  private CloudinaryService: CloudinaryService) {}

  async create(createCategoryDto: CreateCategoryDto, file: Express.Multer.File, folder:string) {
    try{
      const uploadImage = await this.CloudinaryService.uploadFile(file, folder);
      const imageUrl = uploadImage.url;
      const category = this.categoryRepository.create({ ...createCategoryDto, image: imageUrl});
      await this.categoryRepository.save(category);
    
      return category;
    }
    catch(error){
      throw new InternalServerErrorException(error);
    }
  }

  /* async create(createCategoryDto: CreateCategoryDto) {
    try {
      const category = this.categoryRepository.create(createCategoryDto);
      await this.categoryRepository.save(category);
      return category;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  } */

  async findAll() {
    try {
      const categories = await this.categoryRepository.find({relations: {elements: true}});
      return categories;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  findOne(id: number) {
    const category = this.categoryRepository.findOne({
      where: { id },
      relations: {elements: true}
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

  async busqueda(termino:string){
    const buscados = await this.categoryRepository.find({
      where:{name:Like(`%${termino}%`)},
      relations: {elements: true}});
      
    return buscados;
  }
}
