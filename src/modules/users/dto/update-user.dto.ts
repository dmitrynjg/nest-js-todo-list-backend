import { PartialType } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class UpdateUserWithIdDto extends UpdateUserDto {
  @IsUUID(4, { message: 'id должен быть uuid' })
  id: string;
}
