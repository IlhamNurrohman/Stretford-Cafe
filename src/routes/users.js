const express = require("express");

const Router = express.Router();

const usersController = require("../controllers/users");
const validate = require("../middlewares/validate");

Router.get("/all", usersController.getAllUsers);
Router.delete("/:id", usersController.deleteUsersbyId);
Router.post("/", validate.usersData, usersController.postNewUsers);
Router.patch("/:id", validate.usersData, usersController.patchUpdateUsers);

module.exports = Router;