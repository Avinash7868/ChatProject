import { InputType, Int, Field } from '@nestjs/graphql';
import { IsEmpty, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateChatInput {
  @IsNotEmpty()
  @Field()
  content: string;

  @IsEmpty()
  @Field({ nullable: true })
  From: string;

  @IsNotEmpty()
  @Field()
  To: string;
}

@InputType()
export class CreateChatInput2 {
  @Field()
  _id: string;

  @IsNotEmpty()
  @Field()
  content: string;

  @IsEmpty()
  @Field({ nullable: true })
  From: string;

  @IsNotEmpty()
  @Field()
  To: string;

  @Field()
  createdAt: Date;
}
