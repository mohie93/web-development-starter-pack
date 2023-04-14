import express from "express";
import { usersRoutes } from "../users-module/user-routes";
import { servicesRoutes } from "../external-module/external-routes";

export const routes = express.Router();

routes.use([usersRoutes, servicesRoutes]);
