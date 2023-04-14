import { NextFunction, Request, Response } from "express";

export const apiAuthHandler = async (request: Request, response: Response, next: NextFunction) => {
  try {
    // authorization= Bearer token
    const token = request.headers["authorization"]?.split(" ")[1];

    if (!token) {
      return response.status(401).json({ error: "Forbidden resource", message: "Unauthorized access" });
    }

    // Add authentication logic
    // JWT or Any other
    next();
  } catch (error) {
    console.log("Error: ", error);
    return response.status(401).json({ error: "Forbidden resource", message: "Unauthorized access" });
  }
};
