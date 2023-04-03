import knex from "../configs/knex";

export const USERS_TABLE = "users";

import { IUser, IUserQueryOptions, IPaginateParams } from "../interfaces";

export class User {
  static async create(user: IUser) {
    return await knex(USERS_TABLE).insert(user).returning("*");
  }

  static async bulKCreate(users: Array<IUser>) {
    return await knex.batchInsert(USERS_TABLE, users).returning("*");
  }

  static async delete(userId: string) {
    return await knex(USERS_TABLE).delete(userId);
  }

  static async bulKDelete(usersIds: Array<string>) {
    return await knex.raw(`DELETE FROM ${USERS_TABLE} WHERE id IN (${usersIds.join(", ")})`);
  }

  static async getAll() {
    return await knex(USERS_TABLE).select("*");
  }

  static async getAllPaginate(params: IPaginateParams) {
    console.log(params);
    return await knex(USERS_TABLE).paginate(params).select("*");
  }

  static async getById(userId: string) {
    return knex(USERS_TABLE).where({ id: userId }).select("*").first();
  }

  static async getBy(options: IUserQueryOptions) {
    return knex(USERS_TABLE).where(options).select("*");
  }

  static async update(userId: string, user: IUser) {
    return knex(USERS_TABLE).where({ id: userId }).update(user);
  }
}
