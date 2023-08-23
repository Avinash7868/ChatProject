import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import * as mongoose from 'mongoose';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: mongoose.Model<User>,
  ) {}

  create(createUserInput: CreateUserInput) {
    return this.userModel.create(createUserInput);
  }

  findAll() {
    return this.userModel.find();
  }

  async findAll2(excludeUserEmail: string) {
    //Below i am excluding the logged in user from the list of users
    let chatuser = this.userModel.find({ email: { $ne: excludeUserEmail } });
    //Below i am getting all the messages between the logged in user and other users in descending order

    return chatuser;
  }

  findOne(id: string) {
    return this.userModel.findById(id);
  }

  findWithName(name: string) {
    return this.userModel.find({ name: name });
  }

  async remove(id: string) {
    return await this.userModel.findByIdAndDelete(id);
  }

  async findByEmail(email: string) {
    return await this.userModel.findOne({ email });
  }

  async findByEmailAndPassword(email: string, password: string) {
    const login = await this.userModel.findOne({ email, password });
    if (!login) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return login;
  }
}
