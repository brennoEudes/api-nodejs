const { response } = require("express");
const knex = require("../database/knex");

class MovieNotesController {
  //CREATE
  async create(req, res) {
    const { title, description, rating, movie_tags } = req.body;
    const { user_id } = req.params;

    const [note_id] = await knex("movie_notes").insert({
      title,
      description,
      rating,
      user_id,
    });

    // recebendo obj c/ tags:
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

  // READ (specific id)
  async read(req, res) {
    const { id } = req.params;

    const movieNote = await knex("movie_notes").where({ id }).first(); // buscando nota pelo id e somente uma.
    const movieTags = await knex("movie_tags")
      .where({ note_id: id }) // buscando tag por pelo id e em ordem alfabética
      .orderBy("name");

    return res.status(201).json({
      ...movieNote,
      movieTags,
    });
  }

  // DELETE
  async delete(req, res) {
    const { id } = req.params;
    await knex("movie_notes").where({id}).delete();

    return res.status(201).json("Movie note deleted!")
  }
}

module.exports = MovieNotesController;
