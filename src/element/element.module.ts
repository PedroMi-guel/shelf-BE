import { Module } from '@nestjs/common';
import { ElementService } from './element.service';
import { ElementController } from './element.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Element } from './entities/element.entity';

@Module({
  controllers: [ElementController],
  providers: [ElementService],
  imports: [TypeOrmModule.forFeature([Element])],
})
export class ElementModule {}
