const express = require("express");

const app = express();

app.use(express.json());

// Routes:
app.get("/movies", (req, res) => {
  const { id } = req.query;

  res.send(`The movie id is ${id}!`);
});

app.post("/users", (req, res) => {
  const { name, email, password } = req.body;

  res.json({ name, email, password });
});


const PORT = 3000;

app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));
