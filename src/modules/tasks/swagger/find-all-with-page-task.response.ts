import { ApiProperty } from '@nestjs/swagger';
import { FindAllWithPageResponse } from 'src/utils/repository/swagger/find-all-with-page-response';
import { Task } from '../entities/task.entity';

export class FindAllWithPageTaskResponse extends FindAllWithPageResponse {
  @ApiProperty({ description: 'Список задач', isArray: true })
  result: Task;
}
