import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateRecordDto } from './dto/create-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Record } from './entities/record.entity';
import { Element } from 'src/element/entities/element.entity';

@Injectable()
export class RecordService {
  constructor(@InjectRepository(Record) private recordsRepo: Repository<Record>){}

  async create(createRecordDto: CreateRecordDto) {
    
    try {
      const record = await this.recordsRepo.create(createRecordDto);
      await this.recordsRepo.save(record);

      return record;

    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll() {
    try {
      const records = await this.recordsRepo.find({relations: {element: true, user: true}});
      return records;

    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: number) {
    try {
      const record = await this.recordsRepo.findOne({where: {id}, relations: {element: true, user: true}});

      if(!record){
        throw new NotFoundException('elemento no encontrado');      
      }

      return record;

    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: number, updateRecordDto: UpdateRecordDto) {
    try {
      const record = await this.recordsRepo.preload({
        id,
        ...updateRecordDto});

      if(!record){
        throw new NotFoundException('Elemento no encontrado');
      }

      await this.recordsRepo.save(record);

      return record;
      
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: number) {
    try {
      const record = await this.recordsRepo.findOne({where: {id}});

      if(!record){
        throw new NotFoundException('Elemento no encontrado');      
      }

      await this.recordsRepo.delete(id);

      return {message: `El elemento con el id: ${id} fue eliminado correctamente`};

    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getByElement(id: number){

    try {
      const records = await this.recordsRepo.find({where: { element: { id } }});
      return records;

    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
