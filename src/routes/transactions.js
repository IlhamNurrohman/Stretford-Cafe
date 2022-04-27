const express = require("express");

const Router = express.Router();

const transactionsController = require("../controllers/transactions");
const validate = require("../middlewares/validate");

Router.post("/", validate.transactionsData, transactionsController.postNewTransactions);
Router.get("/all", transactionsController.getAllTransactions);
Router.patch("/:id", validate.transactionsData, transactionsController.patchUpdateTransactions);
Router.delete("/:id", transactionsController.deleteTransactionsbyId);

module.exports = Router;