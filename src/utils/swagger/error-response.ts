import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponse {
  @ApiProperty({
    example: 'Bad Request',
    description: 'Название ошибки',
  })
  error: boolean;
  @ApiProperty({
    example: 400,
    description: 'Код ошибки',
  })
  statusCode: number;
  @ApiProperty({
    example: ['Email неправильно передан'],
    description: 'Сообщение ошибки либо массив string или string',
    required: false,
  })
  message?: string | string[];
}
