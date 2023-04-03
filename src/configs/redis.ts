import * as dotenv from "dotenv";
import { createClient } from "redis";

dotenv.config({});

export const redisCacheClient = createClient({ url: process.env.CACHE_REDIS_URL });

export const redisPubSubClient = createClient({ url: process.env.PUB_SUB_REDIS_URL });
