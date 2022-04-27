const express = require("express");

const Router = express.Router();

const sizesController = require("../controllers/sizes");
const validate = require("../middlewares/validate");

Router.post("/", validate.sizesData, sizesController.postNewsizes);
Router.get("/all", sizesController.getAllsizes);
Router.patch("/:id", validate.sizesData, sizesController.patchUpdatesizes);
Router.delete("/:id", sizesController.deletesizesbyId);

module.exports = Router;