import { Request, Response } from "express";
import { User } from "../models";
import { IUser, IUserQueryOptions, IPaginateParams } from "../interfaces";

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

export const bulkCreate = () => async (request: Request, response: Response) => {
  return response.status(201).json({ user: {} });
};

export const bulkDestroy = () => async (request: Request, response: Response) => {
  const { usersIds } = request.body;

  if (Array.isArray(usersIds) && usersIds.length > 0) {
    await User.bulKDelete(usersIds);
    return response.status(204).json({ user: {} });
  }

  return response.status(204).json({ user: {} });
};
