import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  Matches,
  IsUUID,
  ValidateNested,
  IsArray,
  ArrayMinSize,
} from 'class-validator';
import { IsGtZeroAndInt } from 'src/utils/decorators/validator/is-gt-zero-and-positive.decorator';
import { GlobalDto } from 'src/utils/dto/global.dto';

export class TaskPositionDto {
  @ApiProperty({
    example: 1,
    description:
      'Позиция для вывода (отностильно его sort запрос) c тасками Целое число больше 0',
  })
  @IsGtZeroAndInt({ message: 'Позиция должна быть целым числом больше 0' })
  position: number;
  @ApiProperty({
    example: '12bcb8a7-ebbb-4c90-a5c1-a4b2c9056da4',
    description: 'UUID задачи',
  })
  @IsUUID(4, { message: 'id должен быть uuid' })
  id: string;
}

export class SwitchPositionsTaskDto extends GlobalDto {
  @ApiProperty({
    example: [
      {
        position: 1,
        id: 'd32d3f2f-76f2-4885-8b53-ea8d7cfdfcd9',
      },
      {
        position: 2,
        id: '12bcb8a7-ebbb-4c90-a5c1-a4b2c9056da4',
      },
    ],
    description: 'Список задач с их id и позициями которые нужно поменять',
  })
  @IsArray()
  @ArrayMinSize(2, {
    message: 'Минимальное количиство передаваемых данных в tasks 2 штуки',
  })
  @ValidateNested({ each: true })
  @Type(() => TaskPositionDto)
  tasks: TaskPositionDto[];
  @ApiProperty({
    example: '303a5027-3289-48da-8f23-2213f9a3808c',
    description: 'id папки где мы меняем tasks местами',
  })
  @IsUUID(4, { message: 'folder должен быть uuid' })
  folder: string;
}
