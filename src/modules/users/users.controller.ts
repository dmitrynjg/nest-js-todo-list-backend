import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
import { User } from 'src/utils/decorators/user/user.decerator';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User as UserEntity } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @ApiOperation({
    summary: 'Получить информацию о пользователе',
    description:
      'Передавая Access Token вы получаете информацию о пользователе',
  })
  @ApiResponse({
    status: 200,
    type: UserEntity,
  })
  @UseGuards(AuthGuard)
  @Get()
  getUser(@User() user) {
    return this.usersService.findById(user.id);
  }
}
