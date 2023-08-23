import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import * as bcrypt from 'bcrypt';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/auth.guard';
@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    const S_key = await bcrypt.genSalt(6);
    createUserInput.privateKey = S_key;
    console.log(createUserInput.privateKey);

    createUserInput.password = await bcrypt.hash(createUserInput.password, 6);

    return await this.userService.create(createUserInput);
  }

  // @UseGuards(JwtAuthGuard)
  // @Query(() => [User], { name: 'users2' })
  // findAllButNotLogin() {
  //   return this.userService.findAll2();
  // }

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.userService.findAll();
  }

  @Query(() => User, { name: 'userone' })
  findOne(@Args('id') id: string) {
    return this.userService.findOne(id);
  }

  @Mutation(() => User)
  removeUser(@Args('id') id: string) {
    return this.userService.remove(id);
  }

  @Query(() => User, { name: 'userByEmail' })
  findByEmail(@Args('email') email: string) {
    return this.userService.findByEmail(email);
  }

  @Query(() => User, { name: 'userByEmailAndPassword' })
  findByEmailAndPassword(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    return this.userService.findByEmailAndPassword(email, password);
  }
}
