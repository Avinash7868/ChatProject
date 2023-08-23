import { InputType, Field } from '@nestjs/graphql';
import {
  IsAlphanumeric,
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsString,
} from 'class-validator';

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

  @IsString()
  @Field(() => String, { description: 'Enter your password' })
  password: string;

  @IsEmpty()
  @Field({ nullable: true })
  privateKey: string;
}
