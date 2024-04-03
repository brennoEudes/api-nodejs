const { Router } = require("express");

const userRoute = Router();

userRoute.post("/", (req, res) => {
  const { name, email, password } = req.body;

  res.json({ name, email, password });
});

module.exports = userRoute;