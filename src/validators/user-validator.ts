import * as Joi from "joi";
import { Request, Response, NextFunction } from "express";
import { User } from "../models";

const emailInUse = async (email: string) => await User.getBy({ email });

const userSchema = Joi.object({
  name: Joi.string().required().min(6),
  email: Joi.string().email().required()
});

export const validateCreateRequest = async (request: Request, response: Response, next: NextFunction) => {
  try {
    if (await emailInUse(request.body.email)) {
      return response.status(422).json({ data: { message: "email in use" } });
    }

    const { email, password } = request.body;
    await userSchema.validateAsync({ email, password });

    next();
  } catch (error) {
    return response.status(422).json({ error });
  }
};

export const validateUpdateRequest = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { email, password } = request.body;
    await userSchema.validateAsync({ email, password });

    next();
  } catch (error) {
    return response.status(422).json({ error });
  }
};

export const validateRequestWithId = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { userId } = request.params;
    if (!userId) return response.status(422).json({ error: "user id params is required" });

    next();
  } catch (error) {
    return response.status(422).json({ error });
  }
};
