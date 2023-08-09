import { ApiProperty } from '@nestjs/swagger';

export class FindAllWithPageResponse {
  @ApiProperty({ description: 'Общее количество данных', example: 1 })
  total: number;
  @ApiProperty({ description: 'Текущая страница', example: 1 })
  currentPage: number;
  @ApiProperty({ description: 'Общее количество страниц', example: 1 })
  totalPage: number;
  result: any | [];
}
