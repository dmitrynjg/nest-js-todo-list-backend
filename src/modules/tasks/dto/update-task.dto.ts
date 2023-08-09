import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID, IsBoolean } from 'class-validator';

export class UpdateTaskDto {
  @ApiProperty({
    example: 'Test',
    description: 'Заголовок задачи',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'task.validate.error.title' })
  title?: string;
  @ApiProperty({
    example: true,
    description: 'isDone означает что задача выполнена',
    required: false,
  })
  @IsOptional()
  @IsBoolean({ message: 'task.validate.error.is_done' })
  isDone?: boolean;
  @ApiProperty({
    example: '12bcb8a7-ebbb-4c90-a5c1-a4b2c9056da4',
    description: 'id задачи',
  })
  @IsUUID(4, { message: 'task.validate.error.id' })
  id: string;
}
