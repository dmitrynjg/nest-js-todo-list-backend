import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, Matches } from 'class-validator';
import { IsGtZeroAndInt } from 'src/utils/decorators/validator/is-gt-zero-and-int.decorator';
import { MatchesStringOrArrayString } from 'src/utils/decorators/validator/matches-string-or-array-string.decorator';
import { GlobalDto } from 'src/utils/dto/global.dto';

export class QueryParamsDto extends GlobalDto {
  @ApiProperty({
    example: 1,
    description: 'page для запроса',
    required: false,
  })
  @IsOptional()
  @IsGtZeroAndInt({ message: 'app.validate.error.page' })
  page?: number = 1;

  @ApiProperty({
    example: 1,
    description: 'limit для запроса',
    required: false,
  })
  @IsOptional()
  @IsGtZeroAndInt({ message: 'app.validate.error.limit' })
  limit?: number = 10;

  @ApiProperty({
    example: 'title:like:%test%',
    description: `Функция "filters" помогает создавать пользователям собственные запросы к базе данных. Например, мы можем использовать 
      ее для выполнения поиска по определенному критерию с использованием оператора "like". Также, если нам нужно получить 
      информацию по конкретному идентификатору, мы можем указать его при использовании фильтра "?filters=id:...". Фильтры позволяют 
      нам точно настроить запросы и найти нужные данные в базе данных. Это удобно, когда нам нужно найти записи, содержащие 
      определенную подстроку, или получить информацию о конкретном объекте. Функция "filters" предоставляет гибкий и удобный 
      способ работать с данными в базе.`,
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
    description:
      'Если нужно получить информацию у опеределенных данных, можно передать списком через in их id',
    required: false,
  })
  @IsOptional()
  @Matches(RegExp(/^[a-zA-Z0-9-]+(,\s?[a-zA-Z0-9-]+)*$/), {
    message: 'app.validate.error.in',
  })
  in?: string;

  @ApiProperty({
    example: 'id, title',
    description:
      'поля которые нужно получить, допустим нам нужны только поля id, title',
    required: false,
  })
  @IsOptional()
  @Matches(RegExp(/^[a-zA-Z0-9]+(,\s?[a-zA-Z0-9]+)*$/), {
    message: 'app.validate.error.attributes',
  })
  attributes?: string;
}
