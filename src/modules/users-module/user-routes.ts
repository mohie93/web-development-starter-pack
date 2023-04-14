import { Router } from "express";
import * as usersController from "./users-controller";
import { validateCreateRequest, validateUpdateRequest, validateRequestWithId } from "./user-validator";
export const usersRoutes: Router = Router();

usersRoutes.get("/api/users", usersController.getAll);

usersRoutes.post("/api/users", validateCreateRequest, usersController.create);

usersRoutes.get("/api/users/:userId", validateRequestWithId, usersController.getById);

usersRoutes.patch("/api/users/:userId", validateUpdateRequest, usersController.update);

usersRoutes.delete("/api/users/:userId", validateRequestWithId, usersController.destroy);

usersRoutes.post("/api/bulk/users", usersController.bulkCreate);

usersRoutes.delete("/api/bulk/users", usersController.bulkDestroy);
