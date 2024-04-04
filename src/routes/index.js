const { Router } = require("express");

const usersRoutes = require("./user.routes.js");
const routes = Router();

routes.use("/users", usersRoutes);

module.exports = routes;

