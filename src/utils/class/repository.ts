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
}
