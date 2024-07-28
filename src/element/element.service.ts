import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateElementDto } from './dto/create-element.dto';
import { UpdateElementDto } from './dto/update-element.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Element } from './entities/element.entity';
import { In, Like, Repository } from 'typeorm';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class ElementService {
  constructor(@InjectRepository(Element)
  private elementRepository: Repository<Element>,
  private CloudinaryService: CloudinaryService) { }

  async create(createElementDto: CreateElementDto, file: Express.Multer.File, folder:string) {
    try{
      const uploadImage = await this.CloudinaryService.uploadFile(file, folder);
      const imageUrl = uploadImage.url;
      const element = this.elementRepository.create({ ...createElementDto, image: imageUrl});
      await this.elementRepository.save(element);
      return element;
    }
    catch(error){
      throw new InternalServerErrorException(error);
    }
  }

  /*async create(createElementDto: CreateElementDto) {
    try {
      const element = this.elementRepository.create(createElementDto);
      await this.elementRepository.save(element);
      return element;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }*/

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

  async findByIds(ids: number[] ){
    const elements:Element[] = await this.elementRepository.findBy({id: In(ids)})

    return elements
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

  async busqueda(termino:string){
    const buscados = await this.elementRepository.find({where:{name:Like(`%${termino}%`)}});
    return buscados;
  }
}
