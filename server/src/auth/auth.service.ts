import { Injectable } from '@nestjs/common';
import { User, UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { Role } from '../role/role.enum';

export type UnregisteredUser = {
  username: string;
  password: string;
};

export type JwtPayload = { sub: string; username: string; roles: Role[] };

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOne(username);

    if (user && (await compare(password, user.password))) {
      return {
        userId: user._id,
        roles: user.roles,
      };
    }
    return null;
  }

  login(user: User) {
    const payload: JwtPayload = {
      sub: user.userId,
      username: user.username,
      roles: user.roles,
    };
    //console.log(user);
    return {
      access_token: this.jwtService.sign(payload),
      userId: user.userId,
      roles: user.roles,
    };
  }

  async register(user: UnregisteredUser) {
    await this.userService.insert(user);
    //return this.login(user);
  }
}
