const express = require("express");

const Router = express.Router();

const productsController = require("../controllers/products");
const validate = require("../middlewares/validate");

Router.post("/", validate.productsData, productsController.postNewProduts);
Router.get("/", productsController.getfindProducts);
Router.patch("/:id", productsController.patchUpdateProducts);
Router.delete("/:id", productsController.deleteProductsbyId);
Router.get("/sort", productsController.sortProductsByQuery);
Router.get("/favorite", productsController.sortProductsByTransactions);

module.exports = Router;