import { Injectable } from '@nestjs/common';
import { CreateChatInput } from './dto/create-chat.input';
import { UpdateChatInput } from './dto/update-chat.input';
import { UserService } from '../user/user.service';
import { InjectModel } from '@nestjs/mongoose';
import { Chat } from './entities/chat.entity';
import * as mongoose from 'mongoose';

@Injectable()
export class ChatService {
  constructor(
    private readonly userService: UserService,
    @InjectModel(Chat.name) private readonly chatModel: mongoose.Model<Chat>,
  ) {}

  findAllChatUsers(loggedInUserEmail: string) {
    return this.userService.findAll2(loggedInUserEmail);
  }

  findAll() {
    return this.chatModel.find();
  }

  async findMessagesBetweenTwoUsers(From: string, To: string) {
    // const skipAmount = (page - 1) * pageSize;
    const skipAmount = 0;
    const chat = await this.chatModel
      .find({
        $or: [
          { $and: [{ From: From }, { To: To }] },
          { $and: [{ From: To }, { To: From }] },
        ],
      })
      .sort({ createdAt: -1 })
      .skip(skipAmount)
      .limit(20);
    return chat;
  }

  findRecipient(UserName: string) {
    return this.userService.findWithName(UserName);
  }

  SendMessage(CreateChatInput: CreateChatInput) {
    return this.chatModel.create(CreateChatInput);
  }
}
