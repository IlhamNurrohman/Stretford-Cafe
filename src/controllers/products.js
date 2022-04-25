const productsModel = require("../models/products");
const { createNewProducts, getAllProductsfromServer, updateProducts, deleteDataProductsfromServer, findProducts } =
    productsModel;
const { successResponse, errorResponse } = require("../helpers/response");

const postNewProduts = (req, res) => {
    createNewProducts(req.body)
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

const getAllProducts = (_, res) => {
    getAllProductsfromServer()
        .then((result) => {
            const { total, data } = result;
            successResponse(res, 200, data, total);
        })
        .catch((error) => {
            const { err, status } = error;
            errorResponse(res, status, err);
        });
}

const patchUpdateProducts = (req, res) => {
    updateProducts(req.body)
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

const findProductsByQuery = (req, res) => {
    findProducts(req.query)
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

module.exports = {
    postNewProduts,
    getAllProducts,
    patchUpdateProducts,
    deleteProductsbyId,
    findProductsByQuery,
};