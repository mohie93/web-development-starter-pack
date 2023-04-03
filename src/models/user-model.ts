import { v4 as uuidv4 } from "uuid";
import knex from "../configs/knex";

export const USERS_TABLE = "users";

import { IUser, IUserQueryOptions, IPaginateParams } from "../interfaces";

export class User {
  static async create(user: IUser) {
    return knex(USERS_TABLE)
      .insert({ id: uuidv4(), ...user })
      .returning("*");
  }

  static async bulKCreate(users: Array<IUser>) {
    return knex.batchInsert(USERS_TABLE, users).returning("*");
  }

  static async delete(userId: string) {
    return knex(USERS_TABLE).where({ id: userId }).del();
  }

  static async bulKDelete(usersIds: Array<string>) {
    return knex.raw(`DELETE FROM ${USERS_TABLE} WHERE id IN (${usersIds.join(", ")})`);
  }

  static async getAll() {
    return knex(USERS_TABLE).select("*");
  }

  static async getAllPaginate(params: IPaginateParams) {
    return knex(USERS_TABLE).paginate(params);
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
