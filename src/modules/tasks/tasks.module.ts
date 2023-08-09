import { Module, Injectable } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TasksRepository } from './tasks.repository';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { UsersRepository } from '../users/users.repository';
import { FoldersService } from '../folders/folders.service';
import { FoldersRepository } from '../folders/folders.repository';

@Module({
  controllers: [TasksController],
  providers: [
    TasksService,
    TasksRepository,
    JwtService,
    UsersService,
    UsersRepository,
    FoldersService,
    FoldersRepository,
  ],
})
export class TasksModule {}
