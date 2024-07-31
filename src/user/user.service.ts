import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo:Repository<User>
  ){}

  async create(createUserDto: CreateUserDto) {      
    try {
      const user = await this.userRepo.create(createUserDto);
      await this.userRepo.save(user);

      return user;

    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll() {
    try{
      const users = await this.userRepo.find();

      return users;

    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async findOne(id: number) {
    try{

      const user = await this.userRepo.findOne({ where: { id } })

      if (!user){
        throw new NotFoundException('Usuario no encontrado');   
      }

      return user

    } catch(error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try{

      const user = await this.userRepo.preload({
        id,
        ...updateUserDto});

      if(!user){
        throw new NotFoundException('Usuario no encontrado');  
      }

      await this.userRepo.save(user);

      return user;
      
    }catch(error){
      throw new InternalServerErrorException(error);
    }
  }

  async remove(id: number) {
    try{
      const user = await this.userRepo.findOne({ where: {id} });

      if(!user){
        throw new NotFoundException('Usuario no encontrado');
      }

      await this.userRepo.delete(id);

      return user;

    } catch (error) {
      throw new InternalServerErrorException(error);
    }

    
  }
  
  async findByEmail(email: string){
    try{

      const user = await this.userRepo.createQueryBuilder('user')
      .select([ 'user.password', 'user.id', 'user.name', 'user.lastName', 'user.email' ])
      .where('user.email = :email')
      .setParameter('email', email)
      .getOne();

      if (!user){
        throw new NotFoundException('Usuario no encontrado');   
      }

      return user

    } catch(error) {
      throw new InternalServerErrorException(error);
    }
  }
}
