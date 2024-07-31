import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateRecordDto } from './dto/create-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Record } from './entities/record.entity';
import { ElementService } from 'src/element/element.service';
import { Element } from 'src/element/entities/element.entity';

@Injectable()
export class RecordService {
  constructor(@InjectRepository(Record) private recordsRepo: Repository<Record>, private elementsService:ElementService){}

  async create(createRecordDto: CreateRecordDto) {
    try {

      const elements = await this.elementsService.findByIds(createRecordDto.elements);

      const record = await this.recordsRepo.create({
        ...createRecordDto, 
        end_time: new Date(createRecordDto.end), 
        start_time: new Date(createRecordDto.start),
        elements: elements
      });

      await this.recordsRepo.save(record);

      return record;

    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll() {
    try {
      const records = await this.recordsRepo.find({relations: {elements: true, user: true}});
      return records;

    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: number) {
    try {
      const record = await this.recordsRepo.findOne({where: {id}, relations: {elements: true, user: true}});

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

      const elements = await this.elementsService.findByIds(updateRecordDto.elements);


      const record = await this.recordsRepo.preload({
        id,
        ...updateRecordDto,
        elements: elements});

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
      let ids:number[] = [];

      const element = await this.elementsService.findOne(id);
      let records = await this.recordsRepo.find({where: { elements: element }});

      records.forEach(element => {
        ids.push(element.id);
      });

      records = await this.recordsRepo.find({where: {id: In(ids)}, relations: {elements: true, user: true}});

      return records;

    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
