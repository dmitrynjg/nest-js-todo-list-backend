import { MainRepository } from 'src/uttils/class/repository';
import { Folder } from './entities/folder.entity';

export class FoldersRepository extends MainRepository {
  constructor() {
    super();
    this.setModel(Folder);
  }
}
