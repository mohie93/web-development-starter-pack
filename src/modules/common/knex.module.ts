import knex from "../../configs/knex";
import { TModel, TModelId } from "../common/types";
import { IPaginateParams, IUserQueryOptions } from "../common/interfaces";

export class KnexModel {
  static async create(table: string, data: TModel) {
    return knex(table).insert(data).returning("*");
  }

  static async bulKCreate(table: string, data: Array<TModel>) {
    return knex.batchInsert(table, data).returning("*");
  }

  static async delete(table: string, entityId: TModelId) {
    return knex(table).where({ id: entityId }).del();
  }

  static async bulKDelete(table: string, data: Array<TModel>) {
    return knex.raw(`DELETE FROM ${table} WHERE id IN (${data.join(", ")})`);
  }

  static async getAll(table: string) {
    return knex(table).select("*");
  }

  static async getAllPaginate(table: string, params: IPaginateParams) {
    return knex(table).paginate(params);
  }

  static async getById(table: string, entityId: string) {
    return knex(table).where({ id: entityId }).select("*").first();
  }

  static async getBy(table: string, options: IUserQueryOptions) {
    return knex(table).where(options).select("*");
  }

  static async update(table: string, entityId: TModelId, entityModel: TModel) {
    return knex(table).where({ id: entityId }).update(entityModel);
  }
}
