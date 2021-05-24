import { CanActivate, ExecutionContext } from '@nestjs/common';
import { UserService } from '../../user/user.service';

export class RegisterUserRequest {
  body: {
    username: string;
    password: string;
  };
}

export class RegisterGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RegisterUserRequest>();
    const candidate = await this.userService.findOne(request.body.username);
    return !candidate;
  }
}
