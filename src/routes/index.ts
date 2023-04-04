import express from "express";
import { usersRoutes } from "./users-routes";
import { servicesRoutes } from "./services-routes";

export const routes = express.Router();

routes.use([usersRoutes, servicesRoutes]);
