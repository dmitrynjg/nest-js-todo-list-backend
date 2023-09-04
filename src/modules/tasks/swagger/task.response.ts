import { ApiProperty } from '@nestjs/swagger';
import { Task } from '../entities/task.entity';

export class TaskResponse extends Task {
  @ApiProperty({
    example: '4b481f9f-c90f-45e9-aeed-2558960ef330',
    description: 'id пользователя',
  })
  authorTask: string;
  @ApiProperty({
    example: '12bcb8a7-ebbb-4c90-a5c1-a4b2c9056da4',
    description: 'id пользователя',
  })
  folderTask: string;
}
