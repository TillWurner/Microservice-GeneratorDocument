import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';


@Injectable()
export class AuthService {

  private requestCount = 0;
  constructor(
    @InjectModel( User.name )
    private userModel: Model<User>,
  ) {}


  async crear (createUserDto: CreateUserDto){
    //console.log(createUserDto);

    try {
      const newUser = new this.userModel( createUserDto );
      return newUser.save();
    } catch (error) {
      console.log(error.code);
    }
  }

  async create() {
    try {
      let descripcion = '';
      
      if (this.requestCount % 2 === 0) {
        descripcion = 'Solicito Pdf';
      } else {
        descripcion = 'Solicito Excel';
      }

      const newUser = new this.userModel({
        codigo: '1',
        descripcion: descripcion,
      });

      this.requestCount++;

      return newUser.save();
    } catch (error) {
      console.log(error.code);
    }
  }  

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
