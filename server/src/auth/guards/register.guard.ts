import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Inject,
} from '@nestjs/common';
import { UserService } from '../../user/user.service';

export class RegisterUserRequest {
  body: {
    fullname: string;
    username: string;
    password: string;
  };
}

export class RegisterGuard implements CanActivate {
  constructor(
    @Inject(UserService.name) private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RegisterUserRequest>();
    const candidate = await this.userService.findOne(request.body.username);
    if (candidate) throw new BadRequestException('User already exists');

    return !candidate;
  }
}
