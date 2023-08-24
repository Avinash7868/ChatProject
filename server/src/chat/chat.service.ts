import { Injectable } from '@nestjs/common';
import { CreateChatInput } from './dto/create-chat.input';
// import { UpdateChatInput } from './dto/update-chat.input';
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

  // async findAllChatUsers(loggedInUserEmail: string, loggedInUserName: string) {
  //   let users = await this.userService.findAll2(loggedInUserEmail);
  //   const chat = await this.chatModel
  //     .find({
  //       $or: [{ From: loggedInUserName }, { To: loggedInUserName }],
  //     })
  //     .sort({ createdAt: -1 });
  //   console.log('chat', chat);
  //   // Below I am looping through all the users and adding the last message to each user
  //   for (let i = 0; i < users.length; i++) {
  //     const user = users[i];
  //     // Below I am filtering the chat array to get the last message between the logged in user and the user in the loop
  //     const lastMessage = chat.filter(
  //       (c) =>
  //         (c.From === user.name && c.To === loggedInUserName) ||
  //         (c.From === loggedInUserName && c.To === user.name),
  //     );
  //     // Below I am adding the last message to the user in the loop
  //     console.log('lastMessage', lastMessage);
  //     user.latestMessage = lastMessage[0];
  //   }

  //   return users;
  // }
  async findAllChatUsers(loggedInUserEmail: string, loggedInUserName: string) {
    const users = await this.userService.findAll2(loggedInUserEmail);

    // let pipeline = [
    //   {
    //     $match: {
    //       $or: [{ From: loggedInUserName }, { To: loggedInUserName }],
    //     },
    //   },
    //   {
    //     $sort: { createdAt: -1 },
    //   },
    //   {
    //     $group: {
    //       _id: {
    //         $cond: [{ $eq: ['$From', loggedInUserName] }, '$To', '$From'],
    //       },
    //       latestMessage: { $first: '$$ROOT' },
    //     },
    //   },
    // ];

    const latestMessages = await this.chatModel.aggregate([
      {
        $match: {
          $or: [{ From: loggedInUserName }, { To: loggedInUserName }],
        },
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $group: {
          _id: {
            $cond: [{ $eq: ['$From', loggedInUserName] }, '$To', '$From'],
          },
          latestMessage: { $first: '$$ROOT' },
        },
      },
    ]);
    console.log('latestMessages', latestMessages);

    const userWithLatestMessages = users.map((user) => {
      const latestMessage = latestMessages.find(
        (message) => message._id === user.name,
      );
      user.latestMessage = latestMessage ? latestMessage.latestMessage : null;
      return user;
    });
    console.log('userWithLatestMessages', userWithLatestMessages);
    return userWithLatestMessages;
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
