import { ApiProperty } from '@nestjs/swagger';
import { FindAllWithPageResponse } from 'src/utils/repository/swagger/find-all-with-page-response';
import { FolderResponse } from './folder.response';

export class FindAllWithPageFolderResponse extends FindAllWithPageResponse {
  @ApiProperty({ description: 'Список папок', isArray: true })
  result: FolderResponse;
}
