import { MainRepository } from 'src/utils/repository/repository';
import { Folder } from './entities/folder.entity';

export class FoldersRepository extends MainRepository {
  constructor() {
    super();
    this.setModel(Folder);
  }
}
