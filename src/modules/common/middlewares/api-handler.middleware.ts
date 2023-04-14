import { Request, Response } from "express";
import { IApiHandler } from "../interfaces";

const statusCodeCheck = (statusCode: number) => statusCode >= 200 && statusCode <= 299;

export const ApiHandler = (api: IApiHandler) => async (request: Request, response: Response) => {
  try {
    const { statusCode, data, message, error } = await api(request, response);
    const isSuccessStatusCode = statusCodeCheck(statusCode);

    if (error && !isSuccessStatusCode) {
      return response.status(statusCode).json({ error, message });
    }

    if (data && isSuccessStatusCode) {
      return response.status(statusCode).json({ data, message });
    }

    return response.status(500).json({ error: new Error("Internal error!"), message: "Failed to process request!" });
  } catch (error) {
    return response.status(500).json({ error, message: "Internal Server Error!" });
  }
};
