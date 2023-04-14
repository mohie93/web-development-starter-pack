import { Request, Response } from "express";
import { generateSecureUrl as generatePresignedUrl } from "../common/utils";
import knex from "../../configs/knex";
import * as dotenv from "dotenv";
import path from "path";
import { IApiHandlerResponse } from "../common/interfaces";

dotenv.config({});

export const generateSecureUrl = async (request: Request, response: Response): Promise<IApiHandlerResponse> => {
  const { key } = request.body;

  if (!key) {
    return { statusCode: 400, error: "Key param is required", message: "failed to proceed" };
  }

  const { uploadUrl, error } = await generatePresignedUrl({ Bucket: process.env.AWS_S3_BUCKET_NAME as string, Key: key });

  if (error) {
    return { statusCode: 400, error, message: "failed to proceed" };
  }

  if (uploadUrl) {
    return { statusCode: 201, data: uploadUrl, message: "signed url generated" };
  }

  return { statusCode: 400, error: "not found!", message: "failed to proceed" };
};

// We need this as serverless functions has no console to run migration throw cli
export const runMigrations = async (_request: Request, response: Response): Promise<IApiHandlerResponse> => {
  try {
    const options = { directory: path.join(process.cwd(), "src/database/migrations") };
    await knex.migrate.up(options);
    await knex.migrate.latest(options);
    return { statusCode: 201, data: {}, message: "Migration completed!" };
  } catch (error) {
    console.error(error as unknown as string);
    return { statusCode: 400, error: "not found!", message: "failed to proceed" };
  }
};
