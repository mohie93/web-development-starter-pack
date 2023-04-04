import { Router } from "express";
import { servicesController } from "../controllers";
export const servicesRoutes: Router = Router();

servicesRoutes.post("/api/services/generate-secure-url", servicesController.generateSecureUrl);
