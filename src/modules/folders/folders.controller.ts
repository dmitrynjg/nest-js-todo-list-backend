import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FoldersService } from './folders.service';
import { CreateFolderDto } from './dto/create-folder.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';
import { User } from 'src/uttils/decorators/user/user.decerator';
import { AuthGuard } from '../auth/guards/auth.guard';
import { QueryBuilderPipe } from 'src/uttils/query-builder/pipes/query-builder.pipe';
import { FindOptions } from 'sequelize';
import { TasksService } from '../tasks/tasks.service';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { QueryParamsDto } from 'src/uttils/query-builder/dto/query-params-dto';
import { Folder } from './entities/folder.entity';
import { UpdateOrDeleteResponse } from 'src/uttils/swagger/update-or-delete-response';

@Controller('folders')
export class FoldersController {
  constructor(
    private readonly foldersService: FoldersService,
    private readonly tasksService: TasksService,
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Создание папки' })
  @ApiResponse({
    status: 200,
    type: Folder,
  })
  create(@User() user, @Body() createFolderDto: CreateFolderDto) {
    return this.foldersService.create({
      folder: createFolderDto,
      author: user.id,
    });
  }
  @ApiOperation({ summary: 'Получаить список папок папки' })
  @ApiQuery({
    name: 'id',
    description: 'Item ID',
    type: QueryParamsDto,
  })
  @ApiResponse({
    status: 200,
    type: Folder,
    isArray: true,
  })
  @Get()
  @UseGuards(AuthGuard)
  findAll(@User() user, @Query(null, QueryBuilderPipe) query: FindOptions) {
    query = {
      ...query,
      where: {
        ...query.where,
        authorFolder: user.id,
      },
    };

    return this.foldersService.getUserFolders(query);
  }
  @ApiOperation({ summary: 'Получаить папку по id' })
  @ApiResponse({
    status: 200,
    type: Folder,
  })
  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    return this.foldersService.findById(id);
  }

  @Get(':id/tasks')
  @UseGuards(AuthGuard)
  findTasks(
    @Param('id') id: string,
    @User() user,
    @Query(null, QueryBuilderPipe) query: FindOptions,
  ) {
    query = {
      ...query,
      where: {
        ...query.where,
        folderTask: id,
        authorTask: user.id,
      },
    };

    return this.tasksService.findAll(query);
  }

  @ApiOperation({ summary: 'Изменить данные в папки' })
  @ApiResponse({
    status: 200,
    type: UpdateOrDeleteResponse,
  })
  @Patch()
  @UseGuards(AuthGuard)
  update(@User() user, @Body() updateFolderDto: UpdateFolderDto) {
    return this.foldersService.update({
      folder: updateFolderDto,
      author: user.id,
    });
  }

  @ApiOperation({ summary: 'Удалить папку' })
  @ApiResponse({
    status: 200,
    type: UpdateOrDeleteResponse,
  })
  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@User() user, @Param('id') id: string) {
    return this.foldersService.remove({ id, author: user.id });
  }
}
