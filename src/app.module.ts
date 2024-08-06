import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from './category/category.module';
import { ElementModule } from './element/element.module';
import { RecordModule } from './record/record.module';
import { UserModule } from './user/user.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ConfigModule } from '@nestjs/config';

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
    CategoryModule, 
    ElementModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
