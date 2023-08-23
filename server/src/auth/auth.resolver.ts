import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginResponse } from './entities/auth.entity';

@Resolver(() => LoginResponse)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginResponse, { name: 'login' })
  login(@Args('email') email: string, @Args('password') password: string) {
    return this.authService.login(email, password);
  }
}
