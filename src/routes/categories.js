const express = require("express");

const Router = express.Router();

const CategoriesController = require("../controllers/categories");
const validate = require("../middlewares/validate");

Router.post("/", CategoriesController.postNewCategories);
Router.get("/all", CategoriesController.getAllCategories);
Router.patch("/:id", CategoriesController.patchUpdateCategories);
Router.delete("/:id", CategoriesController.deleteCategoriesbyId);

module.exports = Router;