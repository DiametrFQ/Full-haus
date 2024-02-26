import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() AuthUserDto: Record<string, any>) {
    return this.authService.signIn(
      AuthUserDto.phoneNumber,
      AuthUserDto.password,
    );
  }
}
