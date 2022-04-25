const PaymentMethodsModel = require("../models/Payment_methods");
const { createNewPaymentMethods, getAllPaymentMethodsfromServer, updatePaymentMethods, deleteDataPaymentMethodsfromServer } =
PaymentMethodsModel;
const { successResponse, errorResponse } = require("../helpers/response");
const { status } = require("express/lib/response");

const postNewPaymentMethods = (req, res) => {
    createNewPaymentMethods(req.body)
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

const getAllPaymentMethods = (_, res) => {
    getAllPaymentMethodsfromServer()
        .then((result) => {
            const { total, data } = result;
            successResponse(res, 200, data, total);
        })
        .catch((error) => {
            const { err, status } = error;
            errorResponse(res, status, err);
        });
}

const patchUpdatePaymentMethods = (req, res) => {
    updatePaymentMethods(req.params, req.body)
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

const deletePaymentMethodsbyId = (req, res) => {
    const id = req.params;
    deleteDataPaymentMethodsfromServer(id)
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
    postNewPaymentMethods,
    getAllPaymentMethods,
    patchUpdatePaymentMethods,
    deletePaymentMethodsbyId,
};