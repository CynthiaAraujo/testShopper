const { Router } = require ("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload");
const CvsController = require("../controllers/CvsController");

const upload = multer({
  ...uploadConfig.modules.MULTER
});

const cvsRoutes = Router();

const cvsController = new CvsController();

cvsRoutes.post("/", upload.single("file"), cvsController.validateFile);
cvsRoutes.put("/", cvsController.atualizarPrecos);

module.exports  = cvsRoutes;