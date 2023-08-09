import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({
    example: 'Test',
    description: 'Заголовок папки',
  })
  @IsString({ message: 'task.validate.error.title' })
  title: string;
  @ApiProperty({
    example: '12bcb8a7-ebbb-4c90-a5c1-a4b2c9056da4',
    description: 'UUID задачи',
  })
  @IsUUID(4, { message: 'task.validate.error.folder' })
  folder: string;
}
