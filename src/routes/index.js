const { Router } = require("express");

const usersRoutes = require("./user.routes.js");
const movieNotesRoutes = require("./movieNotes.routes.js");

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/movie_notes", movieNotesRoutes);

module.exports = routes;

