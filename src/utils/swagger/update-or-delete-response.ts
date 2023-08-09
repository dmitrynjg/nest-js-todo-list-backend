import { ApiProperty } from '@nestjs/swagger';

export class UpdateOrDeleteResponse {
  @ApiProperty({ example: true, description: 'Успешно выполнено или нет' })
  ok: boolean;
}
