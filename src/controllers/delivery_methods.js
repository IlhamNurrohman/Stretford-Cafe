const DeliveryMethodsModel = require("../models/delivery_methods");
const { createNewDeliveryMethods, getAllDeliveryMethodsfromServer, updateDeliveryMethods, deleteDataDeliveryMethodsfromServer } =
DeliveryMethodsModel;
const { successResponse, errorResponse } = require("../helpers/response");
const { status } = require("express/lib/response");

const postNewDeliveryMethods = (req, res) => {
    createNewDeliveryMethods(req.body)
        .then(({ data }) => {
            res.status(200).json({
                err: null,
                data,
            });
        })
        .catch(({ status, err }) => {
            res.status(status).json({
                err,
                data: [],
            });
        });
};

const getAllDeliveryMethods = (_, res) => {
    getAllDeliveryMethodsfromServer()
        .then((result) => {
            const { total, data } = result;
            successResponse(res, 200, data, total);
        })
        .catch((error) => {
            const { err, status } = error;
            errorResponse(res, status, err);
        });
}

const patchUpdateDeliveryMethods = (req, res) => {
    updateDeliveryMethods(req.params, req.body)
        .then((result) => {
            const { data, msg } = result
            res.status(200).json({
                data,
                msg,
            })
        })
        .catch(({ status, err }) => {
            res.status(status).json({
                err,
                data: [],
            });
        });
};

const deleteDeliveryMethodsbyId = (req, res) => {
    const id = req.params;
    deleteDataDeliveryMethodsfromServer(id)
        .then(({ data }) => {
            res.status(200).json({
                data,
                err: null,
            });
        })
        .catch((error) => {
            const { err, status } = error;
            res.status(status).json({
                data: [],
                err,
            });
        });
};

module.exports = {
    postNewDeliveryMethods,
    getAllDeliveryMethods,
    patchUpdateDeliveryMethods,
    deleteDeliveryMethodsbyId,
};