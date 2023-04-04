import { S3Client } from "../configs/aws-s3";
import { IGetS3Object } from "../interfaces";

export const generateSecureUrl = async ({ Bucket, Key }: IGetS3Object) => {
  return await S3Client.getSignedUrlPromise("putObject", { Bucket, Key });
};
