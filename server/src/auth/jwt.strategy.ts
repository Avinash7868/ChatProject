import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { jwtConstants } from './dto/constants';
import { JwtPayload } from './JWT.payload';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  // This method is called by Passport when it has validated a JWT
  // token and decoded its payload.  Here we validate the payload
  // and either return it or throw an exception if it is invalid.
  async validate(payload: JwtPayload) {
    const { email, password } = payload;
    const user = await this.userService.findByEmail(email);
    if (!user || user.password !== password) {
      throw new UnauthorizedException('Invalid Token');
    }
    return {
      name: user.name,
      email: user.email,
      password: user.password,
      privateKey: user.privateKey,
    };
  }
}
