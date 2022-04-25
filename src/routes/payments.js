const express = require("express");

const Router = express.Router();

const paymentsController = require("../controllers/payments");
const validate = require("../middlewares/validate");

Router.post("/", paymentsController.postNewPayments);
Router.get("/all", paymentsController.getAllPayments);
Router.patch("/:id", paymentsController.patchUpdatePayments);
Router.delete("/:id", paymentsController.deletePaymentsbyId);

module.exports = Router;