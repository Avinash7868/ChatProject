import { InputType, Field } from '@nestjs/graphql';
import {
  IsAlphanumeric,
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { Chat } from '../../chat/entities/chat.entity';
import { CreateChatInput2 } from '../../chat/dto/create-chat.input';

@InputType()
export class CreateUserInput {
  @Field({ nullable: true })
  img: string;

  @IsAlphanumeric()
  @IsNotEmpty()
  @IsString()
  @Field(() => String, { description: 'Enter your name' })
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @IsString()
  @Field(() => String, { description: 'Enter your email' })
  email: string;

  @Field({ nullable: true })
  latestMessage: CreateChatInput2;

  @IsString()
  @Field(() => String, { description: 'Enter your password' })
  password: string;

  @IsEmpty()
  @Field({ nullable: true })
  privateKey: string;
}
