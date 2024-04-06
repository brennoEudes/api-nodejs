const { Router } = require("express");
const MovieTagsController = require("../controllers/tagsController");

const movieTagsRoute = Router();
const movieTagsController = new MovieTagsController();

movieTagsRoute.get("/:user_id", movieTagsController.index);

module.exports = movieTagsRoute;
