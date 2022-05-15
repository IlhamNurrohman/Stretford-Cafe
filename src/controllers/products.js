const productsModel = require("../models/products");
const { createNewProducts, updateProducts, deleteDataProductsfromServer, sortProductsTransactions, sortProducts, findProducts } =
    productsModel;
const { successResponse, errorResponse } = require("../helpers/response");

const postNewProduts = (req, res) => {
    createNewProducts(req)
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

const getfindProducts = (req, res) => {
    findProducts(req.query)
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
const patchUpdateProducts = (req, res) => {
    updateProducts(req)
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

const deleteProductsbyId = (req, res) => {
    const id = req.params;
    deleteDataProductsfromServer(id)
        .then(({ data, msg }) => {
            res.status(200).json({
                data,
                msg: 'Data Deleted !',
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

const sortProductsByTransactions = (_, res) => {
    sortProductsTransactions()
        .then(({ data, total }) => {
            res.status(200).json({
                err: null,
                data,
                total,
            });
        })
        .catch(({ status, err }) => {
            res.status(status).json({
                data: [],
                err,
            });
        });
};

const sortProductsByQuery = (req, res) => {
    sortProducts(req.query)
        .then((result) => {
            const { total, data } = result;
            successResponse(res, 200, data, total);
        })
        .catch((error) => {
            const { err, status } = error;
            errorResponse(res, status, err);
        });
};

module.exports = {
    postNewProduts,
    getfindProducts,
    patchUpdateProducts,
    deleteProductsbyId,
    sortProductsByTransactions,
    sortProductsByQuery,
};