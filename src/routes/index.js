const { Router } = require("express");

const usersRoutes = require("./userRoutes.js");

const routes = Router();

routes.use("/users", usersRoutes);

module.exports = routes;