const productsModel = require("../models/products");
const { createNewProducts, updateProducts, deleteDataProductsfromServer, sortProductsTransactions, sortProducts, findProducts } =
    productsModel;
const { successResponse, errorResponse } = require("../helpers/response");

const postNewProduts = (req, res) => {
    const { file } = req;
    createNewProducts(req, file)
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
    const { file } = req;
    updateProducts(req, file)
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
            const { data, totalData, totalPage } = result;
            const { find, categories, sort, order, page = 1, limit } = req.query;
            let nextPage = "/products?";
            let prevPage = "/products?";
            if (find) {
                nextPage += `find=${find}&`;
                prevPage += `find=${find}&`;
            }
            if (categories) {
                nextPage += `categories=${categories}&`;
                prevPage += `categories=${categories}&`;
            }
            if (sort) {
                nextPage += `sort=${sort}&`;
                prevPage += `sort=${sort}&`;
            }
            if (order) {
                nextPage += `order=${order}&`;
                prevPage += `order=${order}&`;
            }
            if (limit) {
                nextPage += `limit=${limit}&`;
                prevPage += `limit=${limit}&`;
            }            
            nextPage += `page=${Number(page)+1}`;
            prevPage += `page=${Number(page)-1}`;
            const meta = {
                totalData,
                totalPage,
                currentPage: Number(page),
                nextPage: Number(page) === totalPage ? null : nextPage,
                prevPage: Number(page) === 1 ? null : prevPage
            };
            res.status(200).json({
                data,
                meta,
                err: null
            });
        })
        .catch(error => {
            const { err, status } = error;
            res.status(status).json({
                data: [],
                err
            });
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