import { FindOptions } from 'sequelize';

export type findById<Model> = {
  id: number | string;
  options?: FindOptions<Model>;
};
