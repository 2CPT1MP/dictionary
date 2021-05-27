import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { RegisterGuard, RegisterUserRequest } from './guards/register.guard';
import { hash } from 'bcrypt';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() request) {
    return this.authService.login(request.user);
  }

  @UseGuards(RegisterGuard)
  @Post('register')
  async register(@Request() request: RegisterUserRequest) {
    const { username, password } = request.body;
    const hashedPassword = await hash(password, 10);

    return this.authService.register({ username, password: hashedPassword });
  }
}
