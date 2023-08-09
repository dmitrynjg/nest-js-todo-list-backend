import { IsString, IsUUID, IsOptional } from 'class-validator';
import { IsEmoji } from 'src/utils/decorators/validator/emoji.decorator';
import { GlobalDto } from 'src/utils/dto/global.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateFolderDto extends GlobalDto {
  @ApiProperty({
    example: 'Test',
    description: 'Загаловок папки',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'folder.validate.error.title' })
  title?: string;
  @ApiProperty({
    example: '⌚️',
    description: 'Emoji папки',
    required: false,
  })
  @IsOptional()
  @IsEmoji({ message: 'folder.validate.error.emoji' })
  emoji?: string;
  @ApiProperty({
    example: '12bcb8a7-ebbb-4c90-a5c1-a4b2c9056da4',
    description: 'id папки в uuid',
  })
  @IsUUID(4, { message: 'folder.validate.error.folder_id' })
  id: string;
}
