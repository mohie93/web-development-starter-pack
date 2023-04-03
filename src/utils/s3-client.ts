import { GetObjectCommand, GetObjectCommandOutput, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { IGeneratePresignedUrl, IGetS3Object } from "../interfaces";
import * as dotenv from "dotenv";
dotenv.config({});

export const createPresignedUrl = async ({ region, bucket, key }: IGeneratePresignedUrl) => {
  const client = new S3Client({ region });
  const command = new PutObjectCommand({ Bucket: bucket, Key: key });
  return await getSignedUrl(client, command, { expiresIn: process.env.PRESIGNED_URL_EXPIRES_IN as unknown as number });
};

export const getObject = async ({ Bucket, Key }: IGetS3Object) => {
  const client = new S3Client({});
  const command = new GetObjectCommand({ Bucket, Key });
  return await client.send(command);
};
