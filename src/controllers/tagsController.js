const knex = require("../database/knex");

class MovieTagsController {
  async index(req, res) {
    const { user_id } = req.params;

    const movieTags = await knex("movie_tags").where({ user_id }); // quanto temos nomes iguais pode colocar direto, ao invés de "user_id: user_id"

    return res.status(201).json(movieTags);
  }
}

module.exports = MovieTagsController;
