import { Request, Response } from "express";
import { generateSecureUrl as generatePresignedUrl } from "../utils";

export const generateSecureUrl = async (request: Request, response: Response) => {
  const { bucket, key } = request.body;

  if (!bucket) {
    return response.status(400).json({ error: "bucket param is required" });
  }

  if (!key) {
    return response.status(400).json({ error: "key param is required" });
  }

  const uploadUrl = await generatePresignedUrl({ Bucket: bucket, Key: key });

  if (uploadUrl) {
    return response.status(201).json({ uploadUrl });
  }

  return response.status(400).json({ error: "failed to generate upload url" });
};
