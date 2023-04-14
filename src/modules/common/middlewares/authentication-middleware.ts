import { Request } from "express";

export const apiAuthHandler = async (request: Request) => {
  // authorization= Bearer token
  const token = request.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return false;
  }

  // Add authentication logic
  // JWT or Any other
  return true;
};
