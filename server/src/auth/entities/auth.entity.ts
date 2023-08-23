import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LoginResponse {
  @Field()
  user: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  token: string;
}
