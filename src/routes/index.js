const { Router } = require("express");

const usersRoutes = require("./user.routes.js");
const movieNotesRoutes = require("./movieNotes.routes.js");
const movieTagsRoutes = require("./movieTags.routes.js");

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/notes", movieNotesRoutes);
routes.use("/tags", movieTagsRoutes);

module.exports = routes;

