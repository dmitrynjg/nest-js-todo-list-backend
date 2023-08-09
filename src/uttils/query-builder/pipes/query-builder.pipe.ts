import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { Op } from 'sequelize';
import { FindOptions } from 'sequelize';
import { Where } from 'sequelize/types/utils';
import { QueryParamsDto } from '../dto/query-params-dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class QueryBuilderPipe implements PipeTransform {
  arrayFiltersToObject(arr: string[][]): Where {
    return arr
      .filter((keys) => keys.indexOf('in') === -1)
      .reduce((object: any, keys: string[]) => {
        return {
          ...object,
          ...keys
            .slice(0, keys.length - 1)
            .reduceRight(
              (acc, item) => ({ [Op[item] ? Op[item] : item]: acc }),
              keys[keys.length - 1],
            ),
        };
      }, {});
  }

  async transform(queryParams: any): Promise<FindOptions> {
    const object = plainToClass(QueryParamsDto, queryParams);
    const errors = await validate(object, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    const errorMessages = errors
      .map((error) => Object.values(error.constraints))
      .flat();

    if (errorMessages.length > 0) {
      throw new BadRequestException(errorMessages);
    }

    const sequelizeQuery: FindOptions = {
      where: {},
      limit: 10,
      offset: 0,
    };

    if (queryParams.filters) {
      sequelizeQuery.where = this.arrayFiltersToObject(
        (typeof queryParams.filters === 'string'
          ? [queryParams.filters]
          : queryParams.filters
        ).map((dataValue: string) => dataValue.split(':')),
      );
    }

    if (queryParams.limit) {
      sequelizeQuery.limit = +queryParams.limit;
    }

    if (queryParams.page) {
      sequelizeQuery.offset =
        (queryParams.page - 1) *
        (queryParams.limit ? queryParams.limit : sequelizeQuery.limit);
    }

    if (queryParams.attributes) {
      sequelizeQuery.attributes = queryParams.attributes
        .split(',')
        .map((attr: string) => attr.trim());
    }

    if (queryParams.sort) {
      sequelizeQuery.order = (
        typeof queryParams.sort === 'string'
          ? [queryParams.sort]
          : queryParams.sort
      ).map((value) => {
        const listSort = value.split(':');
        return [listSort[0], listSort[1].toUpperCase()];
      });
    }

    if (queryParams.in) {
      sequelizeQuery.where = {
        ...sequelizeQuery.where,
        in: queryParams.in.split(',').map((attr: string) => attr.trim()),
      };
    }

    return sequelizeQuery;
  }
}
