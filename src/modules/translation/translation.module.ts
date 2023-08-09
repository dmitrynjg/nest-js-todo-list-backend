import { Module } from '@nestjs/common';
import { join } from 'path';
import {
  AcceptLanguageResolver,
  QueryResolver,
  HeaderResolver,
  CookieResolver,
  I18nModule,
} from 'nestjs-i18n';
import { APP_FILTER } from '@nestjs/core';
import { TranslationFilter } from './translation.filter';

@Module({
  imports: [
    I18nModule.forRootAsync({
      useFactory: () => ({
        fallbackLanguage: 'ru',
        loaderOptions: {
          path: join(__dirname, '..', '..', '..', 'translate'),
          watch: true,
        },
      }),
      resolvers: [
        new QueryResolver(['lang', 'l']),
        new HeaderResolver(['x-custom-lang']),
        new CookieResolver(),
        AcceptLanguageResolver,
      ],
    }),
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: TranslationFilter,
    },
  ],
})
export class TranslationModule {}
