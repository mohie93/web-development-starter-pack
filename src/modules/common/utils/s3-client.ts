import { S3Client } from "../../../configs/aws-s3";
import { IGetS3Object, IPapaParseResponse } from "../interfaces";
import * as papaparse from "papaparse";

export const generateSecureUrl = async ({ Bucket, Key }: IGetS3Object) => {
  try {
    return await S3Client.getSignedUrlPromise("putObject", { Bucket, Key });
  } catch (error) {
    throw new Error(`Services:S3:generateSecureUrl:${error as unknown as string}`);
  }
};

export const getS3Object = async ({ Bucket, Key }: IGetS3Object) => {
  try {
    console.log(Bucket, Key);
    const { Body: content } = await S3Client.getObject({ Bucket, Key }).promise();
    if (!content) throw new Error(`Services:S3:getObject:InvalidKey`);
    return (await papaparse.parse(content.toString(), { header: true })) as IPapaParseResponse;
  } catch (error) {
    console.log({ error });
    throw new Error(`Services:S3:getObject`);
  }
};
