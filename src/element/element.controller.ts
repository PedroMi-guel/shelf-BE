import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, NotFoundException, BadRequestException, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';
import { ElementService } from './element.service';
import { CreateElementDto } from './dto/create-element.dto';
import { UpdateElementDto } from './dto/update-element.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Controller('element')
export class ElementController {
  constructor(
    private readonly elementService: ElementService,
    private readonly CloudinaryService: CloudinaryService) {}

  @Post()
  create(@Body() createElementDto: CreateElementDto) {
    return this.elementService.create(createElementDto);
  }

  @Get()
  findAll() {
    return this.elementService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.elementService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateElementDto: UpdateElementDto) {
    return this.elementService.update(+id, updateElementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.elementService.remove(+id);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }), // 4MB max size
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }), // Allow PNG, JPEG, JPG
        ],
      }),
    )
    file: Express.Multer.File,
    @Body('folder') folder: string
  ){
    if (!folder) {
      throw new BadRequestException('Folder not specified')
    }
    try {
      const result = await this.CloudinaryService.uploadFile(file, folder);
      return {result, message: 'File uploaded successfully'}
    } catch (error) {
      console.error(error);
      throw new NotFoundException('Error uploading file');
    }
  }
}
