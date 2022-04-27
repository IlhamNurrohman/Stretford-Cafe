const express = require("express");

const Router = express.Router();

const CategoriesController = require("../controllers/categories");
const validate = require("../middlewares/validate");

Router.post("/", validate.categoriesData, CategoriesController.postNewCategories);
Router.get("/all", CategoriesController.getAllCategories);
Router.patch("/:id", validate.categoriesData, CategoriesController.patchUpdateCategories);
Router.delete("/:id", CategoriesController.deleteCategoriesbyId);

module.exports = Router;