const express = require("express");

const Router = express.Router();

const ProductDetailsController = require("../controllers/product_details");
const validate = require("../middlewares/validate");

Router.post("/:id_products", ProductDetailsController.postNewProductDetails);
Router.get("/all", ProductDetailsController.getAllProductDetails);
Router.patch("/:id", ProductDetailsController.patchUpdateProductDetails);
Router.delete("/:id", ProductDetailsController.deleteTransactionbyId);

module.exports = Router;