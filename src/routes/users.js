const express = require("express");

const Router = express.Router();
const { checkToken } = require("../middlewares/auth");

const imageUpload = require("../middlewares/upload");

const usersController = require("../controllers/users");
const validate = require("../middlewares/validate");
const userValidate = require("../middlewares/users_validate");

Router.get("/all", usersController.getAllUsers);
Router.delete("/:id", usersController.deleteUsersbyId);
Router.post("/", userValidate.validateCreateUsers, usersController.postNewUsers);
Router.patch("/", checkToken, imageUpload.single("pictures"), usersController.patchUpdateUsers);

module.exports = Router;