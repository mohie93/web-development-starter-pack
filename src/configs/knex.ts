import * as dotenv from "dotenv";
import configs from "../database/knexfile";
import Knex from "knex";

dotenv.config({});

const environment: string = process.env.NODE_ENV || "development";
const knex = Knex(configs[environment]);

module.exports = knex;
