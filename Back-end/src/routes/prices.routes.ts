import { Router } from "express";
import multer from "multer";
import { MULTER as multerConfig } from "../configs/upload";
import { PricesController } from "../controllers/PricesController";

const upload = multer(multerConfig);

const pricesRoutes = Router();

const pricesController = new PricesController();

pricesRoutes.post("/", upload.single("file"), pricesController.validateFile);
pricesRoutes.put("/", pricesController.updatePrices);

export { pricesRoutes };

