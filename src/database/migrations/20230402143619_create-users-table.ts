import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.hasTable("users").then((exists) => {
    if (!exists) {
      return knex.schema.createTable("users", (table) => {
        table.increments("id");
        table.string("name").notNullable();
        table.string("email").notNullable();
        table.timestamp("createdAt").defaultTo(knex.fn.now());
        table.timestamp("updatedAt").defaultTo(knex.fn.now());
      });
    }
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("users");
}
