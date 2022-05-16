const express = require("express");

const Router = express.Router();

const productsController = require("../controllers/products");
const validate = require("../middlewares/products_validate");
const { checkToken } = require("../middlewares/auth");
const imageUpload = require("../middlewares/upload");

Router.post("/", checkToken, validate.checkAuthorizations, imageUpload.single("pictures"), validate.productsData, productsController.postNewProduts);
Router.patch("/:id", checkToken, validate.checkAuthorizations, imageUpload.single("pictures"), productsController.patchUpdateProducts);
Router.delete("/:id", checkToken, validate.checkAuthorizations, productsController.deleteProductsbyId);
Router.get("/", productsController.sortProductsByQuery);
Router.get("/favorite", productsController.sortProductsByTransactions);

module.exports = Router;