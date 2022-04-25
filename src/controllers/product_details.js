const ProductDetailsModel = require("../models/product_details");
const { createNewProductDetails, getAllProductDetailsfromServer, updateProductDetails, deleteDataProductDetailsfromServer } =
    ProductDetailsModel;
const { successResponse, errorResponse } = require("../helpers/response");
const { status } = require("express/lib/response");

const postNewProductDetails = (req, res) => {
    createNewProductDetails(req.params, req.body)
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

const getAllProductDetails = (_, res) => {
    getAllProductDetailsfromServer()
        .then((result) => {
            const { total, data } = result;
            successResponse(res, 200, data, total);
        })
        .catch((error) => {
            const { err, status } = error;
            errorResponse(res, status, err);
        });
}

const patchUpdateProductDetails = (req, res) => {
    updateProductDetails(req.params, req.body)
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

const deleteTransactionbyId = (req, res) => {
    const id = req.params;
    deleteDataProductDetailsfromServer(id)
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
    postNewProductDetails,
    getAllProductDetails,
    patchUpdateProductDetails,
    deleteTransactionbyId,
};