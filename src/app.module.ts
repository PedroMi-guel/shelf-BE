import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from './category/category.module';
import { ElementModule } from './element/element.module';

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
    ElementModule,
    RecordsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
