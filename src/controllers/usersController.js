const { hash, compare } = require("bcryptjs");
const { response } = require("express");
const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class UsersController {

  // Cria usuário:
  async create(req, res) {
    const { name, email, password, avatar } = req.body;

    const checkIfUserExist = await knex("users").where("email", email).first();

    if (checkIfUserExist) {
      throw new AppError("Email has been used!");
    }

    const hashedPassword = await hash(password, 8);

    await knex("users").insert({name, email, password:hashedPassword, avatar})

    return res.status(201).json("User created sucessfully!");
  }
}

module.exports = UsersController;
