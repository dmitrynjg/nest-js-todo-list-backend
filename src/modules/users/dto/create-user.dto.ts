import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Matches } from 'class-validator';
import { Match } from 'src/uttils/decorators/validator/match.decorator';
import { GlobalDto } from 'src/uttils/dto/global.dto';

export class CreateUserDto extends GlobalDto {
  @ApiProperty({
    example: 'test@email.com',
    description: 'Email пользователя',
  })
  @IsEmail({}, { message: 'user.validate.error.email' })
  email: string;
  @ApiProperty({
    example: 'test',
    description: 'Login пользователя',
  })
  @IsString({ message: 'user.validate.error.login' })
  login: string;
  @ApiProperty({
    example: '123456Di',
    description: 'Пароль пользователя',
  })
  @Matches(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/), {
    message: 'user.validate.error.password',
  })
  password: string;
  @ApiProperty({
    example: '123456Di',
    description: 'Подтверждающий пароль',
  })
  @Match(CreateUserDto, ({ password }) => password, {
    message: 'user.validate.error.passwordConfirm',
  })
  passwordConfirm: string;
}
