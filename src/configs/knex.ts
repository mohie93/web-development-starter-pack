require("dotenv").config({});

import config from "../../knexfile";
import Knex from "knex";

const environment: string = process.env.NODE_ENV || "development";
const knex = Knex(config[environment]);

module.exports = knex;
