import { Router } from "express";
import * as usersController from "./users-controller";
import { validateCreateRequest, validateUpdateRequest, validateRequestWithId } from "./user-validator";
import { ApiHandler, apiAuthHandler as protectRoute } from "../common/middlewares";
export const usersRoutes: Router = Router();

// use apiAuthHandler to protect a route

usersRoutes.get("/api/users", ApiHandler(usersController.getAll));

usersRoutes.post("/api/users", protectRoute, validateCreateRequest, ApiHandler(usersController.create));

usersRoutes.get("/api/users/:userId", protectRoute, validateRequestWithId, ApiHandler(usersController.getById));

usersRoutes.patch("/api/users/:userId", protectRoute, validateUpdateRequest, ApiHandler(usersController.update));

usersRoutes.delete("/api/users/:userId", protectRoute, validateRequestWithId, ApiHandler(usersController.destroy));

usersRoutes.post("/api/bulk/users", protectRoute, ApiHandler(usersController.bulkCreate));

usersRoutes.delete("/api/bulk/users", protectRoute, ApiHandler(usersController.bulkDestroy));
