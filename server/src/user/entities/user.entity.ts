import { ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
@ObjectType()
export class User {
  @Field({ nullable: true })
  _id: string;

  @Prop()
  @Field({ nullable: true })
  img: string;

  @Prop({ unique: true })
  @Field()
  name: string;

  @Prop({ unique: true })
  @Field()
  email: string;

  @Prop()
  @Field()
  password: string;

  @Prop()
  @Field({ nullable: true })
  privateKey: string;

  @Field()
  createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
