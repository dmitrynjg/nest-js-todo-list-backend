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
      const databaseConfig = configService.get('database');

      const sequelize = new Sequelize(
        databaseConfig.type === 'sqlite'
          ? {
              dialect: databaseConfig.type,
              storage: path.resolve(
                __dirname,
                '..',
                '..',
                '..',
                databaseConfig.path,
              ),
            }
          : {
              dialect: databaseConfig.type,
              host: databaseConfig.host,
              username: databaseConfig.username,
              password: databaseConfig.password,
              port: databaseConfig.port,
              database: databaseConfig.database,
            },
      );
      sequelize.addModels([User, Folder, Task]);
      await sequelize.sync();
      return sequelize;
    },
    inject: [ConfigService],
    imports: [ConfigModule],
  },
];
