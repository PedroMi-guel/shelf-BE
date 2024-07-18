import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, BadRequestException, NotFoundException, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, Response } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Controller('category')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly CloudinaryService: CloudinaryService) 
    {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }

  // @Post('upload')
  // @UseInterceptors(FileInterceptor('file'))
  // uploadImage(
  //   @UploadedFile(
  //     new ParseFilePipe({
  //       validators:[
  //         new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4}),
  //         new FileTypeValidator({fileType: '.(png|jpeg|jpg)' }),
  //       ]
  //     }),
  //   ) 
  //   file: Express.Multer.File){
  //     return this.CloudinaryService.uploadFile(file);
  //   }

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
      return {message: 'File uploaded successfully'}
    } catch (error) {
      console.error(error);
      throw new NotFoundException('Error uploading file');
    }
  }
}
