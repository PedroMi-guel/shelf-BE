import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateElementDto } from './dto/create-element.dto';
import { UpdateElementDto } from './dto/update-element.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Element } from './entities/element.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ElementService {
  constructor(@InjectRepository(Element)
  private elementRepository: Repository<Element>) { }

  async create(createElementDto: CreateElementDto) {
    try {
      const element = this.elementRepository.create(createElementDto);
      await this.elementRepository.save(element);
      return element;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll() {
    try {
      const elements =  await this.elementRepository.find({relations:['category']});
      return elements;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  findOne(id: number) {
    const element = this.elementRepository.findOne({
      where: { id }
    });
    if (!element) {
      throw new InternalServerErrorException(`Element with id ${id} not found.`);
    }
    return element;
  }

  async update(id: number, updateElementDto: UpdateElementDto) {
    try {
      const element = await this.elementRepository.preload({
        id,
        ... updateElementDto
      });
      await this.elementRepository.save(element);
      return element;
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async remove(id: number) {
    const category = await this.elementRepository.findOne({
      where: { id }
    });
    if (!category) {
      throw new InternalServerErrorException(`Element with id ${id} not found.`);
    }else{
      await this.elementRepository.delete(id);
      return `Element with id ${id} has been deleted.`;
    } 
  }
}
