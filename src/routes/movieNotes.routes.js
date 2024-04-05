const { Router } = require("express");
const MovieNotesController = require("../controllers/moviesController");

const movieNotesRoute = Router();
const movieNotesController = new MovieNotesController();

movieNotesRoute.post("/:user_id", movieNotesController.create);
// userRoute.put("/:id", usersController.update);

module.exports = movieNotesRoute;
