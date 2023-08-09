import { IsOptional, IsString } from 'class-validator';

export class GlobalDto {
  @IsOptional()
  @IsString({ message: 'app.validate.error.lang' })
  lang?: string;
}
