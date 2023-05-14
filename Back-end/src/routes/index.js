const { Router } = require("express");

const cvsRoutes = require("./cvs.routes")

const routes = Router();

routes.use("/cvs", cvsRoutes)


module.exports = routes;
