import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import { FindOptions } from 'sequelize';
import { FoldersService } from '../folders/folders.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { SwitchPositionsTaskDto } from './dto/switch-position.task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksRepository } from './tasks.repository';

@Injectable()
export class TasksService {
  constructor(
    private tasksRepository: TasksRepository,
    private folderService: FoldersService,
  ) {}

  async checkIsAuthorTask(
    id: string | number,
    author: string | number,
  ): Promise<boolean> {
    const task: any = await this.tasksRepository.findById({
      id,
      options: {
        attributes: ['id', 'authorTask'],
        where: {
          authorTask: author,
          id,
        },
        raw: true,
      },
    });
    if (!task || task.authorTask !== author) {
      throw new HttpException(
        'task.error.task_not_found',
        HttpStatus.FORBIDDEN,
      );
    }

    return true;
  }
  async create({
    task,
    author,
  }: {
    task: CreateTaskDto;
    author: string | number;
  }) {
    const folder = await this.folderService.findById(task.folder);

    if (!folder) {
      throw new HttpException(
        'folder.create.folder_not_found',
        HttpStatus.FORBIDDEN,
      );
    }

    const position = await this.tasksRepository
      .find({
        attributes: ['position'],
        order: [['position', 'DESC']],
        raw: true,
        where: {
          folderTask: task.folder,
        },
      })
      .then((res) => (res ? res.position + 1 : 1));

    return this.tasksRepository.create({
      title: task.title,
      authorTask: author,
      position,
      isDone: false,
      folderTask: task.folder,
    });
  }

  async posisitionsSwitch(
    { tasks, folder }: SwitchPositionsTaskDto,
    author: string,
  ) {
    const idUniquesLength = Array.from(
      new Set(tasks.map((data) => data.id)),
    ).length;
    const positionsUniques = Array.from(
      new Set(tasks.map((data) => data.position)),
    );
    const maxPostion = Math.max.apply(null, positionsUniques);

    if (tasks.length > idUniquesLength) {
      throw new HttpException(
        'folder.postition_switch.error.uniques_id',
        HttpStatus.FORBIDDEN,
      );
    }

    if (tasks.length > positionsUniques.length) {
      throw new HttpException(
        'folder.postition_switch.error.pos',
        HttpStatus.FORBIDDEN,
      );
    }

    const findMaxPositions = await this.tasksRepository.max('position', {
      where: {
        folderTask: folder,
      },
    });

    if (maxPostion > findMaxPositions) {
      throw new HttpException(
        'folder.postition_switch.error.max_pos',
        HttpStatus.FORBIDDEN,
      );
    }

    const findTasks = await this.tasksRepository.findAll({
      attributes: ['id', ['authorTask', 'author'], ['folderTask', 'folder']],
      where: {
        id: { [Op.in]: tasks.map((task) => task.id) },
      },
      raw: true,
    });

    if (
      findTasks.length !== tasks.length ||
      !findTasks.every(
        (task) => task.author === author && task.folder === folder,
      )
    ) {
      throw new HttpException(
        'folder.postition_switch.error.task_not_found',
        HttpStatus.FORBIDDEN,
      );
    }

    await Promise.all(
      tasks.map((task) =>
        this.tasksRepository.update(
          { position: task.position },
          { where: { id: task.id } },
        ),
      ),
    );

    return { ok: true };
  }

  findAll(query: FindOptions) {
    query.order = [['position', 'ASC']];
    return this.tasksRepository.findAll(query);
  }

  findById(id: number | string) {
    return this.tasksRepository
      .findById({ id, options: { raw: true } })
      .then((data) => (data ? data : {}));
  }

  async update({
    task,
    author,
  }: {
    task: UpdateTaskDto;
    author: string | number;
  }) {
    const { id, ...updateData } = task;
    if (Object.keys(updateData).length === 0) {
      throw new HttpException(
        'folder.update.error.not_data',
        HttpStatus.FORBIDDEN,
      );
    }
    await this.checkIsAuthorTask(task.id, author);
    await this.tasksRepository.update(updateData, {
      where: { id },
    });
    return { ok: true };
  }

  async remove(id: number | string, author: string | number) {
    await this.checkIsAuthorTask(id, author);
    await this.tasksRepository.deleteById(id);
    return { ok: true };
  }
}
