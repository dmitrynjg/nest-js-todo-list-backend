import { IsString, Matches } from 'class-validator';
import { GlobalDto } from 'src/utils/dto/global.dto';
import { ApiProperty } from '@nestjs/swagger';

export class AuthUserDto extends GlobalDto {
  @ApiProperty({
    example: 'user@mail.ru',
    description: 'Логин это email или login',
  })
  @IsString({ message: 'user.validate.error.login' })
  login: string;
  @ApiProperty({ example: '123456Di', description: 'Пароль' })
  @Matches(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/), {
    message: 'user.validate.error.password',
  })
  password: string;
}
