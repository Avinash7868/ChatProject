import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './JWT.payload';
import { LoginResponse } from './entities/auth.entity';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!user || !isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }
    // console.log('user :- ' + user);
    const payload: JwtPayload = {
      name: user.name,
      email: user.email,
      password: user.password,
      privateKey: user.privateKey,
    };

    const token = this.jwtService.sign(payload);
    // console.log('token :- ' + token);

    const loginResponse: LoginResponse = {
      user: user.name,
      email: user.email,
      token: token,
    };
    return loginResponse;
  }
}
