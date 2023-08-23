import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatResolver } from './chat.resolver';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import mongoose, { mongo } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatSchema } from './entities/chat.entity';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([{ name: 'Chat', schema: ChatSchema }]),
  ],

  providers: [ChatResolver, ChatService],
})
export class ChatModule {}
