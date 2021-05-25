import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RegisterGuard, RegisterUserRequest } from './guards/register.guard';
import { Roles } from '../role/roles.decorator';
import { Role } from '../role/role.enum';
import { RoleGuard } from '../role/role.guard';
import { Auth } from './guards/auth.guard';

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

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('profile')
  getProfile(@Request() request) {
    //console.log(request.user);
  }
}
