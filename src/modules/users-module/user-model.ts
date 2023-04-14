import { IPaginateParams, IUser, IUserQueryOptions } from "../common/interfaces";
import { KnexModel } from "../common/knex.module";
import { DataBaseTables } from "../common/enums";

export class User {
  static setTable(): string {
    return DataBaseTables.USERS_TABLE as string;
  }

  static async create(user: IUser) {
    return await KnexModel.create(this.setTable(), user);
  }

  static async bulKCreate(data: Array<IUser>) {
    return await KnexModel.bulKCreate(this.setTable(), data);
  }

  static async delete(entityId: string) {
    return KnexModel.delete(this.setTable(), entityId);
  }

  static async bulKDelete(data: Array<IUser>) {
    return KnexModel.bulKDelete(this.setTable(), data);
  }

  static async getAll() {
    return KnexModel.getAll(this.setTable());
  }

  static async getAllPaginate(params: IPaginateParams) {
    return KnexModel.getAllPaginate(this.setTable(), params);
  }

  static async getById(entityId: string) {
    return KnexModel.getById(this.setTable(), entityId);
  }

  static async getBy(options: IUserQueryOptions) {
    return KnexModel.getBy(this.setTable(), options);
  }

  static async update(entityId: string, entityModel: IUser) {
    return KnexModel.update(this.setTable(), entityId, entityModel);
  }
}
