import type { Knex } from "knex";
import * as dotenv from "dotenv";

dotenv.config({});

interface IKenxConfig {
  [key: string]: Knex.Config;
}

const { DATABASE_ENGINE, DATABASE_HOST, DATABASE_PORT, DATABASE_USER, DATABASE_NAME, DATABASE_PASSWORD } = process.env;

const configs: IKenxConfig = {
  test: {
    client: DATABASE_ENGINE,
    connection: {
      host: DATABASE_HOST,
      port: DATABASE_PORT as unknown as number,
      user: DATABASE_USER,
      password: DATABASE_PASSWORD,
      database: DATABASE_NAME
    },
    migrations: {
      directory: "./migrations"
    }
  },
  development: {
    client: DATABASE_ENGINE,
    connection: {
      host: DATABASE_HOST,
      port: DATABASE_PORT as unknown as number,
      user: DATABASE_USER,
      password: DATABASE_PASSWORD,
      database: DATABASE_NAME
    },
    migrations: {
      directory: "./migrations"
    }
  },
  staging: {
    client: DATABASE_ENGINE,
    connection: {
      host: DATABASE_HOST,
      port: DATABASE_PORT as unknown as number,
      user: DATABASE_USER,
      password: DATABASE_PASSWORD,
      database: DATABASE_NAME
    },
    pool: {
      min: 2,
      max: 5
    },
    migrations: {
      directory: "./migrations"
    }
  },
  production: {
    client: DATABASE_ENGINE,
    connection: {
      host: DATABASE_HOST,
      port: DATABASE_PORT as unknown as number,
      user: DATABASE_USER,
      password: DATABASE_PASSWORD,
      database: DATABASE_NAME
    },
    pool: {
      min: 5,
      max: 10
    },
    migrations: {
      directory: "./migrations"
    }
  }
};

export default configs;
