import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateRecordDto } from './dto/create-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Record } from './entities/record.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RecordsService {
  constructor(
    @InjectRepository(Record)
    private recordRepo:Repository<Record>
  ){
    
  }

  async create(createRecordDto: CreateRecordDto) {
    try {
      const record = await this.recordRepo.create(createRecordDto);
      await this.recordRepo.save(record);

      return record;

    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll() {
    try {
      const records = await this.recordRepo.find();
      return records;

    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findOne(id: number) {
    try {
      const record = await this.recordRepo.findOne({where: {id}});

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
      const record = await this.recordRepo.preload({
        id,
        ...updateRecordDto});

      if(!record){
        throw new NotFoundException('Producto no encontrado');
      }

      await this.recordRepo.save(record);

      return record;
      
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} record`;
  }
}
