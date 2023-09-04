import { ApiProperty } from '@nestjs/swagger';
import { Folder } from '../entities/folder.entity';

export class FolderResponse extends Folder {
  @ApiProperty({ example: 1, description: 'Количество задач' })
  totalTasks: number;
  @ApiProperty({ example: 1, description: 'Количество выполнененых задач' })
  totalTasksIsDone: number;
  @ApiProperty({ example: 0, description: 'Количество не выполнененых задач' })
  totalTasksNotDone: number;
}
