import { Request, Response, query } from "express";
import { User } from "../models";
import { IUser, IUserQueryOptions, IPaginateParams } from "../interfaces";

export const create = async (request: Request, response: Response) => {
  const { email, name }: IUser = request.body;
  const user = await User.create({ email, name });
  if (user) {
    return response.status(201).json({ user, message: "operation completed" });
  }
  return response.status(400).json({ user: {}, message: "bad request" });
};

export const getAll = async (request: Request, response: Response) => {
  // handle pagination
  const paginationOptions = request.query as unknown as IPaginateParams;
  if (paginationOptions) {
    console.log("IN");
    const users = await User.getAllPaginate(paginationOptions);
    if (!users) {
      return response.status(404).json({ users: [], message: "operation completed" });
    }

    return response.status(200).json({ users, message: "operation completed" });
  }

  // Handle search operation
  const searchOptions: IUserQueryOptions = request.query;
  if (searchOptions) {
    const users = await User.getBy(searchOptions);
    if (!users) {
      return response.status(404).json({ users: [], message: "operation completed" });
    }

    return response.status(200).json({ users, message: "operation completed" });
  }

  // handle get all ( not recommended )
  const users = await User.getAll();
  return response.status(200).json({ users, message: "operation completed" });
};

export const getById = async (request: Request, response: Response) => {
  const { userId } = request.params;
  if (!userId) {
    return response.status(404).json({ user: {}, message: "operation completed" });
  }

  const user = await User.getById(userId);
  return response.status(200).json({ user, message: "operation completed" });
};

export const update = async (request: Request, response: Response) => {
  const { userId } = request.params;
  if (!userId) {
    return response.status(404).json({ user: {}, message: "operation completed" });
  }

  const { name, email } = request.body;
  await User.update(userId, { name, email });
  const user = await User.getById(userId);

  return response.status(200).json({ user, message: "operation completed" });
};

export const destroy = async (request: Request, response: Response) => {
  const { userId } = request.params;
  if (!userId) {
    return response.status(404).json({ user: {}, message: "operation completed" });
  }

  await User.delete(userId);
  return response.status(204);
};

export const bulkCreate = () => async (request: Request, response: Response) => {
  return response.status(200).json({ message: "operation completed" });
};

export const bulkDestroy = () => async (request: Request, response: Response) => {
  const { usersIds } = request.body;

  if (Array.isArray(usersIds) && usersIds.length > 0) {
    await User.bulKDelete(usersIds);
    return response.status(204);
  }

  return response.status(200).json({ message: "operation completed" });
};
