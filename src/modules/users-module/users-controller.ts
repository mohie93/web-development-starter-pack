import { Request, Response } from "express";
import { User } from "./user-model";
import { IUser, IUserQueryOptions, IPaginateParams, IApiHandlerResponse } from "../common/interfaces";
import { getS3Object } from "../common/utils/s3-client";

import * as dotenv from "dotenv";

dotenv.config({});

export const create = async (request: Request, _response: Response): Promise<IApiHandlerResponse> => {
  const { email, name }: IUser = request.body;
  const [user] = await User.create({ email, name });
  if (user) {
    return { statusCode: 200, data: user, message: "fetched user successfully" };
  }
  return { statusCode: 400, error: "user not found", message: "failed to fetch user" };
};

export const getAll = async (request: Request, _response: Response): Promise<IApiHandlerResponse> => {
  // handle pagination
  const { perPage, currentPage } = request.query as unknown as IPaginateParams;
  if (perPage && currentPage) {
    const { data: users, pagination: meta } = await User.getAllPaginate({ perPage, currentPage });

    if (!users) {
      return { statusCode: 400, error: "users not found", message: "failed to fetch users" };
    }

    return { statusCode: 200, data: users, meta, message: "fetched users successfully" };
  }

  // Handle search operation
  const query: IUserQueryOptions = request.query;
  if (query) {
    const users = await User.getBy(query);
    if (!users) {
      return { statusCode: 404, error: "users not found", message: "failed to fetch users" };
    }

    return { statusCode: 200, data: users, message: "fetched users successfully" };
  }

  // handle get all ( not recommended )
  const users = await User.getAll();
  return { statusCode: 200, data: users, message: "fetched users successfully" };
};

export const getById = async (request: Request, _response: Response): Promise<IApiHandlerResponse> => {
  const { userId } = request.params;
  if (!userId) {
    return { statusCode: 404, error: "user not found", message: "failed to fetch user" };
  }

  const user = await User.getById(userId);

  if (!user) {
    return { statusCode: 404, error: "user not found", message: "failed to fetch user" };
  }

  return { statusCode: 200, data: user, message: "user fetched successfully" };
};

export const update = async (request: Request, _response: Response): Promise<IApiHandlerResponse> => {
  const { userId } = request.params;
  if (!userId) {
    return { statusCode: 404, error: "user not found", message: "failed to find user" };
  }

  const { name, email } = request.body;
  await User.update(userId, { name, email });
  const user = await User.getById(userId);

  return { statusCode: 200, data: user, message: "fetched user successfully" };
};

export const destroy = async (request: Request, _response: Response): Promise<IApiHandlerResponse> => {
  const { userId } = request.params;
  if (!userId) {
    return { statusCode: 404, error: "user not found", message: "failed to find user" };
  }

  await User.delete(userId);
  return { statusCode: 204, data: {}, message: "user deleted successfully" };
};

export const bulkCreate = async (request: Request, _response: Response): Promise<IApiHandlerResponse> => {
  const { key } = request.body;

  if (!key) {
    return {
      statusCode: 400,
      error: "key param is required",
      message: "failed to trigger bulk create user"
    };
  }

  const { data: usersRecords, errors } = await getS3Object({
    Bucket: process.env.AWS_S3_BUCKET_NAME as string,
    Key: key
  });

  if (Array.isArray(errors) && errors.length > 0) {
    return {
      statusCode: 400,
      error: errors.join(", "),
      message: "failed to trigger bulk create user"
    };
  }

  const users = await User.bulKCreate(usersRecords as IUser[]);

  return { statusCode: 201, data: users, message: "Bulk create operation completed" };
};

export const bulkDestroy = async (request: Request, _response: Response): Promise<IApiHandlerResponse> => {
  const { usersIds } = request.body;

  if (Array.isArray(usersIds) && usersIds.length > 0) {
    await User.bulKDelete(usersIds);
    return { statusCode: 404, error: "user not found", message: "failed to find user" };
  }

  return { statusCode: 204, data: {}, message: "user deleted successfully" };
};
