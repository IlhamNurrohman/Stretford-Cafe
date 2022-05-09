const express = require("express");

const Router = express.Router();

const usersController = require("../controllers/users");
const validate = require("../middlewares/validate");
const userValidate = require("../middlewares/users_validate");

Router.get("/all", usersController.getAllUsers);
Router.delete("/:id", usersController.deleteUsersbyId);
Router.post("/", userValidate.validateCreateUsers, usersController.postNewUsers);
Router.patch("/:id", usersController.patchUpdateUsers);

module.exports = Router;