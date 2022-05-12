const express = require("express");
const Router = express.Router();

const pingRouter = require("./ping");
const usersRouter = require("./users");
const productsRouter = require("./products");
const promosRouter = require("./promos");
const productDetailsRouter = require("./product_details");
const transactionsRouter = require("./transactions");
const delivery_methodsRouter = require("./delivery_methods");
const sizesRouter = require("./sizes");
const payment_methodsRouter = require("./payment_methods");
const categoriesRouter = require("./categories");
const authRouter = require("./auth");

Router.use("/ping", pingRouter);
Router.use("/users", usersRouter);
Router.use("/products", productsRouter);
Router.use("/promos", promosRouter);
Router.use("/product_details", productDetailsRouter);
Router.use("/transactions", transactionsRouter);
Router.use("/delivery_methods", delivery_methodsRouter);
Router.use("/sizes", sizesRouter);
Router.use("/payment_methods", payment_methodsRouter);
Router.use("/categories", categoriesRouter);
Router.use("/auth", authRouter);

module.exports = Router;