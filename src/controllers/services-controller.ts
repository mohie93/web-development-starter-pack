import { Request, Response } from "express";
import { generateSecureUrl as generatePresignedUrl } from "../utils";
import knex from "../configs/knex";
import * as dotenv from "dotenv";
import path from "path";

dotenv.config({});

export const generateSecureUrl = async (request: Request, response: Response) => {
  const { key } = request.body;

  if (!key) {
    return response.status(400).json({ error: "key param is required" });
  }

  const uploadUrl = await generatePresignedUrl({ Bucket: process.env.AWS_S3_BUCKET_NAME as string, Key: key });

  if (uploadUrl) {
    return response.status(201).json({ uploadUrl });
  }

  return response.status(400).json({ error: "failed to generate upload url" });
};

// We need this as serverless functions has no console to run migration throw cli
export const runMigrations = async (request: Request, response: Response) => {
  try {
    const options = { directory: path.join(process.cwd(), "src/database/migrations") };
    await knex.migrate.up(options);
    await knex.migrate.latest(options);
    response.status(200).json({ message: "Migration completed!" });
  } catch (error) {
    console.error(error as unknown as string);
    response.status(500).json({ error });
  }
};
