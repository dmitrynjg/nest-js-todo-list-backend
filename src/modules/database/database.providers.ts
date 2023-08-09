import { Sequelize } from 'sequelize-typescript';
import { User } from 'src/modules/users/entities/user.entity';
import { Folder } from 'src/modules/folders/entities/folder.entity';
import { Task } from 'src/modules/tasks/entities/task.entity';
import * as path from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async (configService: ConfigService) => {
      const sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: path.resolve(
          __dirname,
          '..',
          '..',
          '..',
          configService.get('DB_PATH') || 'database/db.sqlite',
        ),
      });
      sequelize.addModels([User, Folder, Task]);
      await sequelize.sync();
      return sequelize;
    },
    inject: [ConfigService],
    imports: [ConfigModule],
  },
];
