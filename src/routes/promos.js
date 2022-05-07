const express = require("express");

const Router = express.Router();

const promosController = require("../controllers/promos");
const validate = require("../middlewares/validate");

Router.post("/", validate.promosData, promosController.postNewPromos);
Router.get("/find", promosController.findPromos);
Router.patch("/:id", promosController.patchUpdatePromos);
Router.delete("/:id", promosController.deletePromosbyId);
Router.get("/", promosController.sortPromosByQuery);

module.exports = Router;