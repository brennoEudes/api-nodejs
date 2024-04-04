const { hash, compare } = require("bcryptjs");
const { response } = require("express");
const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class UsersController {
  // CRIA USUÁRIO:
  async create(req, res) {
    const { name, email, password, avatar } = req.body;

    const checkIfUserExist = await knex("users").where("email", email).first();

    if (checkIfUserExist) {
      throw new AppError("Email has been used!");
    }

    const hashedPassword = await hash(password, 8);

    await knex("users").insert({
      name,
      email,
      password: hashedPassword,
      avatar,
    });

    return res.status(201).json("User created sucessfully!");
  }

  // EDITA USUÁRIO:
  async update(req, res) {
    const { name, email, password, old_password, avatar } = req.body;
    const { id } = req.params;

    const user = await knex("users").where("id", id).first();

    if (!user) {
      throw new AppError("User not found!");
    }

    if (email !== user.email) {
      const userWithUpdatedEmail = await knex("users")
        .where("email", email)
        .first();
      if (userWithUpdatedEmail) {
        throw new AppError("Email has been used!");
      }
    }

    // Cria um obj e atualiza os dados (c/ nullish operator: se tiver conteúdo no input, atualiza input. Se não, mantém o conteúdo do DB, evitando que o campo fique vazio):
    const updatedUserData = {
      name: name ?? user.name,
      email: email ?? user.email,
      avatar: avatar ?? user.avatar,
    };

    if (password && !old_password) {
      throw new AppError("Old password is required!");
    }

    // Usamos o método "compare" de bcrypt p/ verificar a senha antiga digitada c/ a senha do user no DB, pois as senhas são criptografadas:
    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError("Old password not found!");
      }

      user.password = await hash(password, 8);

      // Inclui a senha criptografada diretamente no objeto updatedUserData
      updatedUserData.password = user.password;
    }

    await knex("users").where("id", id).update(updatedUserData);

    return res.status(200).json("User profile has been updated!");
  }
}

module.exports = UsersController;
