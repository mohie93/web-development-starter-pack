import { Request, Response } from "express";
import { generateSecureUrl as generatePresignedUrl } from "../utils";
import * as dotenv from "dotenv";

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
