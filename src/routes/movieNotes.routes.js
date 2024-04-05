const { Router } = require("express");
const MovieNotesController = require("../controllers/moviesController");

const movieNotesRoute = Router();
const movieNotesController = new MovieNotesController();

movieNotesRoute.post("/:user_id", movieNotesController.create);
movieNotesRoute.get("/:id", movieNotesController.read); // passando o id da NOTA como parâmetro
movieNotesRoute.delete("/:id", movieNotesController.delete); // passando o id da NOTA como parâmetro

// userRoute.put("/:id", usersController.update);

module.exports = movieNotesRoute;
