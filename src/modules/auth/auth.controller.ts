import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { AuthUserDto } from './dto/auth-user.dto';
import { NotAuthGuard } from './guards/not-auth.guard';
import { AuthSwaggerSchema } from './swagger/auth.schema';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Регистрация пользователя' })
  @ApiResponse({
    status: 200,
    type: AuthSwaggerSchema,
  })
  @Post('register')
  @UseGuards(NotAuthGuard)
  register(@Body() createUser: CreateUserDto) {
    return this.authService.register(createUser);
  }

  @ApiOperation({ summary: 'Авторизация пользователя' })
  @ApiResponse({
    status: 200,
    type: AuthSwaggerSchema,
  })
  @Post('login')
  @UseGuards(NotAuthGuard)
  login(@Body() authUser: AuthUserDto) {
    return this.authService.login(authUser);
  }
}
