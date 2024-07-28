import { Module } from '@nestjs/common';
import { ElementService } from './element.service';
import { ElementController } from './element.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Element } from './entities/element.entity';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Module({
  controllers: [ElementController],
  providers: [ElementService, CloudinaryService],
  imports: [TypeOrmModule.forFeature([Element])],
  exports: [ElementService]
})
export class ElementModule {}
