import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, Matches } from 'class-validator';
import { IsGtZeroAndPositive } from 'src/uttils/decorators/validator/is-gt-zero-and-positive.decorator';
import { MatchesStringOrArrayString } from 'src/uttils/decorators/validator/matches-string-or-array-string.decorator';
import { GlobalDto } from 'src/uttils/dto/global.dto';

export class QueryParamsDto extends GlobalDto {
  @ApiProperty({
    example: 1,
    description: 'page для запроса',
    required: false,
  })
  @IsOptional()
  @IsGtZeroAndPositive({ message: 'app.validate.error.page' })
  page?: number = 1;

  @ApiProperty({
    example: 1,
    description: 'limit для запроса',
    required: false,
  })
  @IsOptional()
  @IsGtZeroAndPositive({ message: 'app.validate.error.limit' })
  limit?: number = 10;

  @ApiProperty({
    example: 'title:like:%test%',
    description:
      'filters нужен для создание кастомного запроса в базу данных здесь мы делаем поиск через like',
    required: false,
  })
  @IsOptional()
  @MatchesStringOrArrayString(new RegExp(/^[a-zA-Z0-9]+(:[a-zA-Z0-9$%]+)+$/), {
    message: 'app.validate.error.filters',
  })
  filters?: string[] | string;
  @ApiProperty({
    example: 'title:desc',
    description: 'Сортировка пример (field:asc или field:desc)',
    required: false,
  })
  @IsOptional()
  @MatchesStringOrArrayString(
    new RegExp(/^[a-zA-Z0-9]+:(ASC|DESC|asc|desc)$/),
    {
      message: 'app.validate.error.sort',
    },
  )
  sort?: string[] | string;

  @ApiProperty({
    example:
      '6231f114-2da4-42cf-b00e-5e1629ed7683, 62110c57-5c4c-4e5f-9f1b-cbeb7007aa73, 566f8c8f-dc51-4f35-bbbd-c08a971d4dfe',
    description: 'In ищем по id',
    required: false,
  })
  @IsOptional()
  @Matches(RegExp(/^[a-zA-Z0-9-]+(,\s?[a-zA-Z0-9-]+)*$/), {
    message: 'app.validate.error.in',
  })
  in?: string;

  @ApiProperty({
    example: 'id, title',
    description: 'поля которые нужно вывести id, title',
    required: false,
  })
  @IsOptional()
  @Matches(RegExp(/^[a-zA-Z0-9]+(,\s?[a-zA-Z0-9]+)*$/), {
    message: 'app.validate.error.attributes',
  })
  attributes?: string;
}
