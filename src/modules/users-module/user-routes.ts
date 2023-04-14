import { Router } from "express";
import * as usersController from "./users-controller";
import { validateCreateRequest, validateUpdateRequest, validateRequestWithId } from "./user-validator";
import { protectedRoute, publicRoute } from "../common/middlewares";
export const usersRoutes: Router = Router();

usersRoutes.get("/api/users", publicRoute, usersController.getAll);

usersRoutes.post("/api/users", protectedRoute, validateCreateRequest, usersController.create);

usersRoutes.get("/api/users/:userId", publicRoute, validateRequestWithId, usersController.getById);

usersRoutes.patch("/api/users/:userId", protectedRoute, validateUpdateRequest, usersController.update);

usersRoutes.delete("/api/users/:userId", protectedRoute, validateRequestWithId, usersController.destroy);

usersRoutes.post("/api/bulk/users", protectedRoute, usersController.bulkCreate);

usersRoutes.delete("/api/bulk/users", protectedRoute, usersController.bulkDestroy);
