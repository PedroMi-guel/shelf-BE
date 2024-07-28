import { Module } from '@nestjs/common';
import { RecordService } from './record.service';
import { RecordController } from './record.controller';
import { Record } from './entities/record.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ElementModule } from 'src/element/element.module';

@Module({
  imports: [ElementModule, TypeOrmModule.forFeature([Record])],
  controllers: [RecordController],
  providers: [RecordService],
})

export class RecordModule {}
