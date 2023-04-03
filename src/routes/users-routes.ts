import { Router } from "express";
import { usersController } from "../controllers";
import { validateCreateRequest, validateUpdateRequest, validateRequestWithId } from "../validators";
export const usersRoutes: Router = Router();

usersRoutes.get("/api/users", usersController.getAll);

usersRoutes.post("/api/users", validateCreateRequest, usersController.create);

usersRoutes.get("/api/users/:userId", validateRequestWithId, usersController.getById);

usersRoutes.patch("/api/users/:userId", validateUpdateRequest, usersController.update);

usersRoutes.delete("/api/users/:userId", validateRequestWithId, usersController.destroy);

usersRoutes.post("/api/users/bulk", usersController.bulkCreate);

usersRoutes.delete("/api/users/bulk", usersController.bulkDestroy);
