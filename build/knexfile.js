"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = __importStar(require("dotenv"));
dotenv.config({});
var _a = process.env, DATABASE_ENGINE = _a.DATABASE_ENGINE, DATABASE_HOST = _a.DATABASE_HOST, DATABASE_PORT = _a.DATABASE_PORT, DATABASE_USER = _a.DATABASE_USER, DATABASE_NAME = _a.DATABASE_NAME, DATABASE_PASSWORD = _a.DATABASE_PASSWORD;
var config = {
    test: {
        client: DATABASE_ENGINE,
        connection: {
            host: DATABASE_HOST,
            port: DATABASE_PORT,
            user: DATABASE_USER,
            password: DATABASE_PASSWORD,
            database: DATABASE_NAME
        }
    },
    development: {
        client: DATABASE_ENGINE,
        connection: {
            host: DATABASE_HOST,
            port: DATABASE_PORT,
            user: DATABASE_USER,
            password: DATABASE_PASSWORD,
            database: DATABASE_NAME
        }
    },
    staging: {
        client: DATABASE_ENGINE,
        connection: {
            host: DATABASE_HOST,
            port: DATABASE_PORT,
            user: DATABASE_USER,
            password: DATABASE_PASSWORD,
            database: DATABASE_NAME
        },
        pool: {
            min: 2,
            max: 5
        },
        migrations: {
            tableName: "knex_migrations"
        }
    },
    production: {
        client: DATABASE_ENGINE,
        connection: {
            host: DATABASE_HOST,
            port: DATABASE_PORT,
            user: DATABASE_USER,
            password: DATABASE_PASSWORD,
            database: DATABASE_NAME
        },
        pool: {
            min: 5,
            max: 10
        },
        migrations: {
            tableName: "knex_migrations"
        }
    }
};
module.exports = config;
