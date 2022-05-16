const express = require("express");

const Router = express.Router();

const promosController = require("../controllers/promos");
const validate = require("../middlewares/promos");
const { checkToken } = require("../middlewares/auth");
const imageUpload = require("../middlewares/upload");

Router.post("/", checkToken, validate.checkAuthorizations, imageUpload.single("pictures"), validate.promosData, promosController.postNewPromos);
Router.get("/find", promosController.findPromos);
Router.patch("/:id", checkToken, validate.checkAuthorizations, imageUpload.single("pictures"), promosController.patchUpdatePromos);
Router.delete("/:id", promosController.deletePromosbyId);
Router.get("/", promosController.sortPromosByQuery);

module.exports = Router;