const path = require("path");

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: path.resolve(__dirname, "src", "database", "database.db"), // caminho p/ arquivo database.db
    },
    migrations: {
      directory: path.resolve(
        __dirname,
        "src",
        "database",
        "knex",
        "migrations"
      ), // caminho p/ armazenar as tabelas q serão criadas automaticamente;
    },
    useNullAsDefault: true,
  },
};
