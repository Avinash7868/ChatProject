import {
  Resolver,
  Query,
  Mutation,
  Args,
  Context,
  Subscription,
} from '@nestjs/graphql';
import { ChatService } from './chat.service';
import { Chat } from './entities/chat.entity';
import { CreateChatInput } from './dto/create-chat.input';
import { User } from '../user/entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/auth.guard';
import { UserInputError } from '@nestjs/apollo';
import { PubSub, withFilter } from 'graphql-subscriptions';

@Resolver(() => Chat)
export class ChatResolver {
  constructor(private readonly chatService: ChatService) {}
  private pubsub = new PubSub();

  //******************Below is the query to get all the users for chat except the logged in user*********
  @UseGuards(JwtAuthGuard)
  @Query(() => [User], { name: 'AllChatUsers' })
  async findAllChatUsers(@Context() context: any) {
    // Below I am getting the logged in user email from the context/Token
    const loggedInUserEmail = context.req.user.email;
    const loggedInUserName = context.req.user.name;
    let users = await this.chatService.findAllChatUsers(
      loggedInUserEmail,
      loggedInUserName,
    );
    return users;
  }

  //*******************Below is the mutation to send message******************
  @UseGuards(JwtAuthGuard)
  @Mutation(() => Chat)
  async sendMessage(
    @Args('createChatInput') createChatInput: CreateChatInput,
    @Context() context: any,
  ) {
    // Below I am getting the logged in user name from the context/Token
    const loggedInUserUser = context.req.user.name;
    const recipient = await this.chatService.findRecipient(createChatInput.To);
    // Below I am checking if the recipient is found or not
    if (
      recipient.length === 0 ||
      recipient === undefined ||
      recipient === null
    ) {
      throw new UserInputError('Recipient not found');
    }

    // Below I am checking if the logged in user is sending message to himself or not
    if (loggedInUserUser === createChatInput.To) {
      throw new UserInputError('You cannot send message to yourself');
    }

    // Below I am checking if the content is empty or not
    if (createChatInput.content.trim() === '') {
      throw new UserInputError('Content cannot be empty');
    }

    createChatInput.From = loggedInUserUser;
    const sentMessage = await this.chatService.SendMessage(createChatInput);

    // Below I am publishing the message to the subscription so that the recipient can get the message but only the logged in user's message so i am using withFilter and passing the loggedInUserUser's name
    this.pubsub.publish('NewMessage', {
      NewMessage: sentMessage,
    });

    return sentMessage;
  }
  //Below is the query to get all the messages
  @UseGuards(JwtAuthGuard)
  @Query(() => [Chat], { name: 'AllChat' })
  findAll() {
    return this.chatService.findAll();
  }

  //*******************Below is the query to get all the messages between two users******************
  @UseGuards(JwtAuthGuard)
  @Query(() => [Chat], { name: 'MessagesBetweenTwoUsers' })
  async findMessagesBetweenTwoUsers(
    @Args('To') To: string,
    @Context() context: any,
  ) {
    // Below I am getting the logged in user name from the context/Token
    const loggedInUserUser = context.req.user.name;
    const From = loggedInUserUser;
    // Below I am checking if the recipient is found or not
    const OtherUser = await this.chatService.findRecipient(To);
    if (
      OtherUser.length === 0 ||
      OtherUser === undefined ||
      OtherUser === null
    ) {
      throw new UserInputError('User not found');
    }

    // Below I am checking if the logged in user is finding message to himself or not
    if (From === To) {
      throw new UserInputError('Not Found');
    }
    const chat = await this.chatService.findMessagesBetweenTwoUsers(From, To);
    return chat;
  }

  // below is the mutation to delete message between two users
  // @UseGuards(JwtAuthGuard)
  // @Mutation(() => Boolean)
  // async deleteMessageBetweenTwoUsers(
  //   @Args('To') To: string,
  //   @Args('From') From: string,
  //   @Context() context: any,
  // ) {
  //   return this.chatService.deleteMessagesBetweenTwoUsers(From, To);
  // }

  //*****Below are all the subscription *********

  // Below I am using withFilter to filter the messages so that only the sender and recipient can get the message if the sender and recipient are logged in
  @Subscription(() => Chat, {
    name: 'NewMessage',
  })
  NewMessage(@Args('loggedInUser') loggedInUser: string) {
    return withFilter(
      () => this.pubsub.asyncIterator(['NewMessage']),
      (payload) => {
        // console.log(payload, 'payload');
        // console.log(loggedInUser, 'loggedInUser');
        return (
          payload.NewMessage.From === loggedInUser ||
          payload.NewMessage.To === loggedInUser
        );
      },
    )(loggedInUser);
  }
}
