import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { I18nContext, I18nService } from 'nestjs-i18n';

@Catch()
export class TranslationFilter implements ExceptionFilter {
  constructor(private readonly i18n: I18nService) {}

  translateMessage(shortCode: string, lang: string) {
    return this.i18n.translate(shortCode, {
      lang,
    });
  }
  getCurrentLang(request: any): string {
    try {
      if (
        (request.query && request.query.lang) ||
        (request.body && request.body.lang)
      ) {
        return request.method === 'GET'
          ? request.query.lang
          : request.body.lang;
      }
      return I18nContext.current().lang;
    } catch {
      return 'ru';
    }
  }

  async catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();
    try {
      const status = exception.getStatus();
      let newErrorValidateResponse = { ...exception };
      if (
        newErrorValidateResponse.response &&
        newErrorValidateResponse.response.message
      ) {
        newErrorValidateResponse = newErrorValidateResponse.response; // при валидации
        if (Array.isArray(newErrorValidateResponse.message)) {
          newErrorValidateResponse.message = await Promise.all(
            exception.response.message.map((message) =>
              this.translateMessage(message, this.getCurrentLang(request)),
            ),
          );
        } else {
          newErrorValidateResponse.message = await this.translateMessage(
            exception.response.message,
            this.getCurrentLang(request),
          );
        }
      } else {
        newErrorValidateResponse.message = await this.translateMessage(
          exception.response,
          this.getCurrentLang(request),
        );
        newErrorValidateResponse.error = newErrorValidateResponse.name;
        delete newErrorValidateResponse.response;
        delete newErrorValidateResponse.name;
      }
      response.status(status).send(newErrorValidateResponse);
    } catch {
      response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ status: 500, error: 'INTERNAL_SERVER_ERROR' });
    }
  }
}
