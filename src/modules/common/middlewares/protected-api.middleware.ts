import { Request, Response } from "express";
import { IApiHandler } from "../interfaces";
import { apiAuthHandler } from "./authentication-middleware";

export const protectedRoute = (api: IApiHandler) => async (request: Request, response: Response) => {
  try {
    const isAuthenticated = await apiAuthHandler(request);

    if (!isAuthenticated) {
      return response.status(401).json({ error: "Forbidden Resource", message: "Unauthorized access" });
    }

    const { statusCode, data, message, error } = await api(request, response);
    if (error) {
      return response.status(statusCode).json({ error, message });
    }

    if (data) {
      return response.status(statusCode).json({ data, message });
    }

    return response.status(500).json({ error: new Error("Internal error!"), message: "Failed to process request!" });
  } catch (error) {
    return response.status(500).json({ error, message: "Internal Server Error!" });
  }
};
