const express = require("express");

const Router = express.Router();

const transactionsController = require("../controllers/transactions");
const validate = require("../middlewares/validate");

Router.post("/", transactionsController.postNewTransactions);
Router.get("/all", transactionsController.getAllTransactions);
Router.patch("/:id", transactionsController.patchUpdateTransactions);
Router.delete("/:id", transactionsController.deleteTransactionsbyId);

module.exports = Router;