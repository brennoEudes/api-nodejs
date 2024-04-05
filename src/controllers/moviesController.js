const { response } = require("express");
const knex = require("../database/knex");

class MovieNotesController {
  //CRIAR
  async create(req, res) {
    const { title, description, rating, movie_tags } = req.body;
    const { user_id } = req.params;

    const [note_id] = await knex("movie_notes").insert({
      title,
      description,
      rating,
      user_id,
    });

    // recebendo obj c/ 2 tags:
    const movieTagsInsert = movie_tags.map((name) => {
      return {
        note_id,
        user_id,
        name,
      };
    });

    await knex("movie_tags").insert(movieTagsInsert);

    return res.status(201).json("Movie notes created sucessfully!");
  }
}

module.exports = MovieNotesController;