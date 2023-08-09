import { User } from './entities/user.entity';
import { MainRepository } from 'src/utils/class/repository';

export class UsersRepository extends MainRepository {
  constructor() {
    super();
    this.setModel(User);
  }
}
