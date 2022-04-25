const express = require("express");

const Router = express.Router();

const promosController = require("../controllers/promos");
const validate = require("../middlewares/validate");

Router.post("/", promosController.postNewPromos);
Router.get("/all", promosController.getAllPromos);
Router.patch("/:id", promosController.patchUpdatePromos);
Router.delete("/:id", promosController.deletePromosbyId);
Router.get("/", promosController.findPromosByQuery);

module.exports = Router;