import { MainRepository } from 'src/utils/class/repository';
import { Task } from './entities/task.entity';

export class TasksRepository extends MainRepository {
  constructor() {
    super();
    this.setModel(Task);
  }
}
