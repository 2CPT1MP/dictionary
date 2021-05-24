import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RegisterGuard, RegisterUserRequest } from './guards/register.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() request) {
    return this.authService.login(request.user);
  }

  /*
  @UseGuards(RegisterGuard)
  @Post('register')
  async register(@Request() request: RegisterUserRequest) {
    const { username, password } = request.body;
    return this.authService.register({ username, password });
  }*/

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile() {
    return 'SUCCESS';
  }
}
