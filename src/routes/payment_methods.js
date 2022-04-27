const express = require("express");

const Router = express.Router();

const PaymentMethodsController = require("../controllers/payment_methods");
const validate = require("../middlewares/validate");

Router.post("/", validate.paymentMethodsData, PaymentMethodsController.postNewPaymentMethods);
Router.get("/all", PaymentMethodsController.getAllPaymentMethods);
Router.patch("/:id", validate.paymentMethodsData, PaymentMethodsController.patchUpdatePaymentMethods);
Router.delete("/:id", PaymentMethodsController.deletePaymentMethodsbyId);

module.exports = Router;