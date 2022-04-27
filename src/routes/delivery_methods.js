const express = require("express");

const Router = express.Router();

const DeliveryMethodsController = require("../controllers/delivery_methods");
const validate = require("../middlewares/validate");

Router.post("/", validate.deliveryMethodsData, DeliveryMethodsController.postNewDeliveryMethods);
Router.get("/all", DeliveryMethodsController.getAllDeliveryMethods);
Router.patch("/:id", validate.deliveryMethodsData, DeliveryMethodsController.patchUpdateDeliveryMethods);
Router.delete("/:id", DeliveryMethodsController.deleteDeliveryMethodsbyId);

module.exports = Router;