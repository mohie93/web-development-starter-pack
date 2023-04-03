import express from "express";
import { usersRoutes } from "./users-routes";

export const routes = express.Router();

routes.use(usersRoutes);
