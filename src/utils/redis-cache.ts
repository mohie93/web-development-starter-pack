"use strict";

import * as dotenv from "dotenv";
import * as crypto from "crypto";

dotenv.config({});

const tokensPrefixName = process.env.TOKEN_PREFIX;
const tokenExpiresIn = process.env.TOKEN_EXPIRES_IN;

import { redisCacheClient as redis } from "../configs/redis";
import { IUser, ITokenInstance } from "../interfaces";
const { promisify } = require("util");

redis.on("error", (error) => {
  console.error(error);
});

export const generateToken = async (profile: IUser, tokenExpiresInParam = null): Promise<ITokenInstance> => {
  const magicNumber = new Date().getTime(); // returns the number of milliseconds since the Unix Epoch.
  const token = crypto.randomBytes(25).toString("hex") + magicNumber;
  const json = JSON.stringify(profile);
  const key = tokensPrefixName + token;
  const expiresIn = tokenExpiresInParam ?? tokenExpiresIn;
  await redis.set(key, json);
  await redis.expire(key, expiresIn as unknown as number);
  return { token, expiresIn: expiresIn as unknown as number };
};

export const removeToken = async (token: string) => {
  const key = tokensPrefixName + token;
  return await redis.del(key);
};

export const findByToken = async (token: string): Promise<IUser> => {
  const key = tokensPrefixName + token;
  const asyncGet = promisify(redis.get).bind(redis);
  const user: IUser = JSON.parse(await asyncGet(key));
  return user;
};

export const refreshToken = async (token: string): Promise<ITokenInstance> => {
  const key = tokensPrefixName + token;
  await redis.expire(key, tokenExpiresIn as unknown as number);
  return { token, expiresIn: tokenExpiresIn as unknown as number };
};
