import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { User } from 'src/utils/decorators/user/user.decerator';
import { SwitchPositionsTaskDto } from './dto/switch-position.task.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Task } from './entities/task.entity';
import { UpdateOrDeleteResponse } from 'src/utils/swagger/update-or-delete-response';
import { ErrorResponse } from 'src/utils/swagger/error-response';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Создание задачи' })
  @ApiResponse({
    status: 200,
    type: Task,
  })
  @ApiResponse({
    status: 403,
    type: ErrorResponse,
    description: 'Ошибка при бизнес логики',
  })
  @ApiResponse({
    status: 400,
    type: ErrorResponse,
    description: 'Ошибка при валидации',
  })
  create(@User() user, @Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create({ task: createTaskDto, author: user.id });
  }

  @Get('/:id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Получение задачи по id' })
  @ApiResponse({
    status: 200,
    type: Task,
  })
  @ApiResponse({
    status: 403,
    type: ErrorResponse,
    description: 'Ошибка при бизнес логики',
  })
  @ApiResponse({
    status: 400,
    type: ErrorResponse,
    description: 'Ошибка при валидации',
  })
  findOne(@Param('id') id: string | number) {
    return this.tasksService.findById(id);
  }

  @Patch()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Обновление данных у задачи' })
  @ApiResponse({
    status: 200,
    type: UpdateOrDeleteResponse,
  })
  @ApiResponse({
    status: 403,
    type: ErrorResponse,
    description: 'Ошибка при бизнес логики',
  })
  @ApiResponse({
    status: 400,
    type: ErrorResponse,
    description: 'Ошибка при валидации',
  })
  update(@Body() updateTaskDto: UpdateTaskDto, @User() user) {
    return this.tasksService.update({ task: updateTaskDto, author: user.id });
  }

  @Patch('/switch')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Изменение у задач позиции (switch position)' })
  @ApiResponse({
    status: 200,
    type: UpdateOrDeleteResponse,
  })
  positionsSwitch(@Body() switchTaskDto: SwitchPositionsTaskDto, @User() user) {
    return this.tasksService.posisitionsSwitch(switchTaskDto, user.id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Удаление по id' })
  @ApiResponse({
    status: 200,
    type: UpdateOrDeleteResponse,
  })
  @ApiResponse({
    status: 403,
    type: ErrorResponse,
    description: 'Ошибка при бизнес логики',
  })
  @ApiResponse({
    status: 400,
    type: ErrorResponse,
    description: 'Ошибка при валидации',
  })
  remove(@Param('id') id: string, @User() user) {
    return this.tasksService.remove(id, user.id);
  }
}
