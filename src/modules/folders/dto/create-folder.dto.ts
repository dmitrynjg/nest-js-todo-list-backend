import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { IsEmoji } from 'src/utils/decorators/validator/emoji.decorator';
import { GlobalDto } from 'src/utils/dto/global.dto';

export class CreateFolderDto extends GlobalDto {
  @ApiProperty({
    example: 'Test',
    description: 'Заголовок папки',
  })
  @IsString({ message: 'folder.validate.error.title' })
  title: string;
  @ApiProperty({
    example: '⌚️',
    description: 'Emoji папки',
  })
  @IsEmoji({ message: 'folder.validate.error.emoji' })
  emoji: string;
}
