const express = require("express");

const Router = express.Router();

const transactionsController = require("../controllers/transactions");
const validate = require("../middlewares/validate");
const { checkToken } = require("../middlewares/auth");
const { checkAuthorizations } = require("../middlewares/users_validate");

Router.post("/", checkToken, checkAuthorizations ,validate.transactionsData, transactionsController.postNewTransactions);
Router.get("/all", transactionsController.getAllTransactions);
Router.patch("/:id", checkToken, validate.checkAuthorizations, transactionsController.patchUpdateTransactions);
Router.delete("/:id", checkToken, validate.checkAuthorizations, transactionsController.deleteTransactionsbyId);

module.exports = Router;