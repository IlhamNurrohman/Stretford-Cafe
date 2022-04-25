const express = require("express");

const Router = express.Router();

const productsController = require("../controllers/products");
const validate = require("../middlewares/validate");

Router.post("/", productsController.postNewProduts);
Router.get("/all", productsController.getAllProducts);
Router.patch("/:id", productsController.patchUpdateProducts);
Router.delete("/:id", productsController.deleteProductsbyId);
Router.get("/", productsController.findProductsByQuery);

module.exports = Router;