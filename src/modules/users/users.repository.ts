import { User } from './entities/user.entity';
import { MainRepository } from 'src/utils/repository/repository';

export class UsersRepository extends MainRepository {
  constructor() {
    super();
    this.setModel(User);
  }
}
