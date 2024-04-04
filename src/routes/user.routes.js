const { Router } = require("express");

const userRoute = Router();

userRoute.post("/", (req, res) => { // não precisa colocar /user pq ele já está no index.js da pasta Routes.
  const { name, email, password } = req.body;

  res.json({ name, email, password });
});

module.exports = userRoute;