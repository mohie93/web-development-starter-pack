import * as AWS from "aws-sdk";
import * as dotenv from "dotenv";

dotenv.config({});

const { AWS_REGION, AWS_ACCESS_KEY, AWS_SECRET_ACCESS_KEY } = process.env;

export const S3Client = new AWS.S3({
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  region: AWS_REGION,
  apiVersion: "'2006-03-01'",
  signatureVersion: "v4"
});
