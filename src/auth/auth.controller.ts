import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto/auth-dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  create(@Body() authDto: AuthDTO) {
    return this.authService.logIn(authDto.email, authDto.password);
  }
}
