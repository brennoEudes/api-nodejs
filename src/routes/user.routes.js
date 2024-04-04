const { Router } = require("express");
const UsersController = require("../controllers/usersController");

const userRoute = Router();
const usersController = new UsersController();

userRoute.post("/", usersController.create);
userRoute.put("/:id", usersController.update);

module.exports = userRoute;
