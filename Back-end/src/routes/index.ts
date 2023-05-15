import { Router } from "express";

import { pricesRoutes } from "./prices.routes";

const routes = Router();

routes.use("/prices", pricesRoutes)

export { routes };
