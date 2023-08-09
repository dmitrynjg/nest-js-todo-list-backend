import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { databaseProviders } from './database.providers';

@Module({
  providers: [ConfigModule, ConfigService, ...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
