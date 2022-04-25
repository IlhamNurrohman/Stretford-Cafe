const express = require("express");

const Router = express.Router();

const PaymentMethodsController = require("../controllers/payment_methods");
const validate = require("../middlewares/validate");

Router.post("/", PaymentMethodsController.postNewPaymentMethods);
Router.get("/all", PaymentMethodsController.getAllPaymentMethods);
Router.patch("/:id", PaymentMethodsController.patchUpdatePaymentMethods);
Router.delete("/:id", PaymentMethodsController.deletePaymentMethodsbyId);

module.exports = Router;