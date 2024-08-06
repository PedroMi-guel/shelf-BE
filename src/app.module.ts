import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ConfigModule } from '@nestjs/config';

import { RecordModule } from './record/record.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { ElementModule } from './element/element.module';
<<<<<<<<< Temporary merge branch 1
import { RecordModule } from './record/record.module';
import { UserModule } from './user/user.module';
=========
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ConfigModule } from '@nestjs/config';
>>>>>>>>> Temporary merge branch 2

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'shelf',
    autoLoadEntities: true,
    synchronize: true,}),
    CategoryModule, ElementModule, CloudinaryModule, ConfigModule.forRoot({ isGlobal: true})], , AuthModule,
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
