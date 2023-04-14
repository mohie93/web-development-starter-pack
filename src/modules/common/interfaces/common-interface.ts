import { TModel, TModelId } from "../types";
import { Request, Response } from "express";
export interface IPaginateParams {
  perPage: number;
  currentPage: number;
}

export interface IPagination {
  total?: number;
  lastPage?: number;
  currentPage: number;
  perPage: number;
  from: number;
  to: number;
}

export interface IWithPagination<T = any> {
  data: T;
  pagination: IPagination;
}

export interface ITokenInstance {
  token: string;
  expiresIn: number;
}

export interface IGeneratePresignedUrl {
  region: string;
  bucket: string;
  key: string;
}

export interface IGetS3Object {
  Key: string;
  Bucket: string;
}

export interface IPapaParseResponse {
  data?: Array<unknown>;
  errors?: Array<unknown>;
}

export interface IApiHandlerResponse {
  statusCode: number;
  message: string;
  data?: TModel | TModelId;
  error?: Error;
}

export interface IApiHandler {
  (req: Request, res: Response): IApiHandlerResponse;
}
