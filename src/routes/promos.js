const express = require("express");

const Router = express.Router();

const promosController = require("../controllers/promos");
const validate = require("../middlewares/promos");
const { checkToken } = require("../middlewares/auth");
const upImageFile = require("../middlewares/upload");

Router.post("/", checkToken, validate.checkAuthorizations, upImageFile, validate.promosData, promosController.postNewPromos);
Router.get("/find", promosController.findPromos);
Router.get("/detail/:id", promosController.getPromosById);
Router.patch("/:id", checkToken, validate.checkAuthorizations, upImageFile, promosController.patchUpdatePromos);
Router.delete("/:id",checkToken, validate.checkAuthorizations, promosController.deletePromosbyId);
Router.get("/", promosController.sortPromosByQuery);

module.exports = Router;