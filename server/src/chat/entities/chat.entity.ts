import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
@ObjectType()
export class Chat {
  @Field()
  _id: string;

  @Prop()
  @Field()
  content: string;

  @Prop()
  @Field({ nullable: true })
  From: string;

  @Prop()
  @Field()
  To: string;

  @Field()
  createdAt: Date;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
