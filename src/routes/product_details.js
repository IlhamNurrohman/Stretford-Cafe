const express = require("express");

const Router = express.Router();

const ProductDetailsController = require("../controllers/product_details");
const validate = require("../middlewares/validate");

Router.post("/:id_products", validate.productDetailsData, ProductDetailsController.postNewProductDetails);
Router.get("/all", ProductDetailsController.getAllProductDetails);
Router.patch("/:id", validate.productDetailsData, ProductDetailsController.patchUpdateProductDetails);
Router.delete("/:id", ProductDetailsController.deleteTransactionbyId);

module.exports = Router;