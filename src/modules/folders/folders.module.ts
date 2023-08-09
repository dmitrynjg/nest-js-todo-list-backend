import { Module } from '@nestjs/common';
import { FoldersService } from './folders.service';
import { FoldersController } from './folders.controller';
import { FoldersRepository } from './folders.repository';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { UsersRepository } from '../users/users.repository';
import { TasksRepository } from '../tasks/tasks.repository';
import { TasksService } from '../tasks/tasks.service';

@Module({
  controllers: [FoldersController],
  providers: [
    JwtService,
    UsersService,
    UsersRepository,
    FoldersService,
    FoldersRepository,
    TasksService,
    TasksRepository,
  ],
})
export class FoldersModule {}
