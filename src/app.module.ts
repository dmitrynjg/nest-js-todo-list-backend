import { Module } from '@nestjs/common';
import { FoldersModule } from './modules/folders/folders.module';
import { UsersModule } from './modules/users/users.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { DatabaseModule } from './modules/database/database.module';
import { TranslationModule } from './modules/translation/translation.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: path.join(
        __dirname,
        '..',
        'env',
        `${process.env.NODE_ENV}.env`,
      ),
    }),
    DatabaseModule,
    TranslationModule,
    AuthModule,
    FoldersModule,
    UsersModule,
    TasksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
