import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {  LoginDTO } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>
    ){}
    
    async create(userDTO: LoginDTO) {
      const { login } = userDTO;
      const user = await this.userModel.findOne({ login });
      if (user) {
        throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
      }
      const createdUser = new this.userModel(userDTO);
      console.log(createdUser)
      console.log(userDTO)
      await createdUser.save();
      return this.sanitizeUser(createdUser);
    }

    async findByLogin(userDTO: LoginDTO) {
      const { login, password } = userDTO;
      const user = await this.userModel.findOne({ login });
      if (!user) {
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
      }
  
      if (password == user.password) {
        return this.sanitizeUser(user);
      } else {
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
      }
    }

    async findByPayload(payload: any) {
      //используется для получения пользователя в JWTStrategy
      const { login } = payload;
      return this.sanitizeUser(await this.userModel.findOne({ login }));
    }

    async checkUserById(id: string): Promise<UserDocument> {
      const user = await this.userModel.findById(id);
      if (!user) {
        throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
      }
      return user;
    }

    async findByFunction() {
      let cur = await this.userModel.find({},{login: 1}).$where(function(){ 
        return this.login == 'ldfs'
      }).exec();
      return;
    }

  sanitizeUser(user: UserDocument):any {
    const sanitized = user.toObject();
    delete sanitized['password'];
    return sanitized;
  }

  
}
