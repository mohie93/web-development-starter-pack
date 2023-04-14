import { Request, Response } from "express";
import { User } from "./user-model";
import { IUser, IUserQueryOptions, IPaginateParams } from "../common/interfaces";
import { getS3Object } from "../common/utils/s3-client";

import * as dotenv from "dotenv";

dotenv.config({});

export const create = async (request: Request, response: Response) => {
  const { email, name }: IUser = request.body;
  const [user] = await User.create({ email, name });
  if (user) {
    return response.status(201).json({ user });
  }
  return response.status(400).json({ user: {}, message: "bad request" });
};

export const getAll = async (request: Request, response: Response) => {
  // handle pagination
  const { perPage, currentPage } = request.query as unknown as IPaginateParams;
  if (perPage && currentPage) {
    const { data: users, pagination } = await User.getAllPaginate({ perPage, currentPage });
    if (!users) {
      return response.status(404).json({ users: [], pagination: {} });
    }

    return response.status(200).json({ users, pagination });
  }

  // Handle search operation
  const query: IUserQueryOptions = request.query;
  if (query) {
    const users = await User.getBy(query);
    if (!users) {
      return response.status(404).json({ users: [] });
    }

    return response.status(200).json({ users });
  }

  // handle get all ( not recommended )
  const users = await User.getAll();
  return response.status(200).json({ users });
};

export const getById = async (request: Request, response: Response) => {
  const { userId } = request.params;
  if (!userId) {
    return response.status(404).json({ user: {} });
  }

  const user = await User.getById(userId);
  return response.status(200).json({ user });
};

export const update = async (request: Request, response: Response) => {
  const { userId } = request.params;
  if (!userId) {
    return response.status(404).json({ user: {} });
  }

  const { name, email } = request.body;
  await User.update(userId, { name, email });
  const user = await User.getById(userId);

  return response.status(200).json({ user });
};

export const destroy = async (request: Request, response: Response) => {
  const { userId } = request.params;
  if (!userId) {
    return response.status(404).json({ user: {} });
  }

  await User.delete(userId);
  return response.status(204).json({ user: {} });
};

export const bulkCreate = async (request: Request, response: Response) => {
  const { key } = request.body;

  if (!key) {
    return response.status(400).json({ error: "key param is required" });
  }

  const { data: usersRecords, errors } = await getS3Object({
    Bucket: process.env.AWS_S3_BUCKET_NAME as string,
    Key: key
  });

  if (Array.isArray(errors) && errors.length > 0) {
    return response.status(400).json({ error: errors });
  }

  const users = await User.bulKCreate(usersRecords as IUser[]);

  return response.status(201).json({ users });
};

export const bulkDestroy = async (request: Request, response: Response) => {
  const { usersIds } = request.body;

  if (Array.isArray(usersIds) && usersIds.length > 0) {
    await User.bulKDelete(usersIds);
    return response.status(204).json({ user: {} });
  }

  return response.status(204).json({ user: {} });
};
