import { findById } from 'src/modules/database/types/repository/findById';
import {
  FindOptions,
  UpdateOptions,
  Attributes,
  CreationAttributes,
} from 'sequelize';

export class MainRepository {
  private model: any;

  setModel(model) {
    this.model = model;
  }

  find(options: FindOptions = {}): Promise<any> {
    return this.model.findOne(options);
  }

  findAll(options: FindOptions = {}): Promise<any[]> {
    return this.model.findAll(options);
  }

  findById({ id, options }: findById<any>): Promise<any> {
    return this.model.findByPk(id, options);
  }

  create(data: CreationAttributes<any>): Promise<any> {
    return this.model.create(data);
  }

  update(
    values: Attributes<any>,
    options: UpdateOptions,
  ): Promise<[affectedCount: number]> {
    return this.model.update(values, options);
  }

  deleteById(id: number | string): Promise<number> {
    return this.model.destroy({
      where: { id },
    });
  }

  max(field: string, options: FindOptions) {
    return this.model.max(field, options);
  }

  min(field: string, options: FindOptions) {
    return this.model.min(field, options);
  }

  count(options: FindOptions) {
    return this.model.count(options);
  }

  async findAllWithPage(query: FindOptions) {
    const { attributes, include, ...queryCounts } = query;
    const total = await this.model.count(queryCounts);
    const result = await this.model.findAll(query);
    const currentPage =
      query.offset === 0 ? 1 : query.offset / (query.limit ? query.limit : 10);
    const totalPages = Math.ceil(total / (query.limit ? query.limit : 10));
    return { total, currentPage, totalPages, result };
  }
}
