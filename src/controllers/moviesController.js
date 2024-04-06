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

  // READ (specific note id)
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
    await knex("movie_notes").where({ id }).delete();

    return res.status(201).json("Movie note deleted!");
  }

  // INDEX (all notes for an id)
  async index(req, res) {
    const { user_id, title, movie_tags } = req.query;

    let allMovieNotes;

    // se houver filtro por tags:
    if (movie_tags) {
      const filterMovieTags = movie_tags
        .split(",")
        .map((movieTag) => movieTag.trim());
      //console.log(filterMovieTags);

      allMovieNotes = await knex("movie_tags")
        // seleciona campos na tabela movie_notes:
        .select([
          "movie_notes.id",
          "movie_notes.title",
          "movie_notes.description",
          "movie_notes.rating",
          "movie_notes.user_id",
        ])
        .where("movie_notes.user_id", user_id) // filtra por tags usuário
        .whereLike("movie_notes.title", `%${title}%`) // filtra por título tags usuário
        .whereIn("name", filterMovieTags)
        .innerJoin("movie_notes", "movie_notes.id", "movie_tags.note_id"); // conectando tabelas
    } else {
      allMovieNotes = await knex("movie_notes")
        .where({ user_id })
        .whereLike("title", `%${title}%`) // busca no DB por resultados que contenham a palavra. Ñ precisa ser exato
        .orderBy("title");
    }

    const userMovieTags = await knex("movie_tags").where({ user_id });
    const movieNotesWithTags = allMovieNotes.map((note) => {
      const movieNoteTags = userMovieTags.filter(
        (tag) => tag.note_id === note.id
      );

      return {
        ...note,
        movie_tags: movieNoteTags,
      };
    });

    return res.status(201).json({ movieNotesWithTags });
  }
}

module.exports = MovieNotesController;
