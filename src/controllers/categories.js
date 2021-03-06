const CategoriesModel = require("../models/categories");
const { createNewCategories, getAllCategoriesfromServer, updateCategories, deleteDataCategoriesfromServer } =
CategoriesModel;
const { successResponse, errorResponse } = require("../helpers/response");
const { status } = require("express/lib/response");

const postNewCategories = (req, res) => {
    createNewCategories(req.body)
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

const getAllCategories = (_, res) => {
    getAllCategoriesfromServer()
        .then((result) => {
            const { total, data } = result;
            successResponse(res, 200, data, total);
        })
        .catch((error) => {
            const { err, status } = error;
            errorResponse(res, status, err);
        });
}

const patchUpdateCategories = (req, res) => {
    updateCategories(req.params, req.body)
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

const deleteCategoriesbyId = (req, res) => {
    const id = req.params;
    deleteDataCategoriesfromServer(id)
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
    postNewCategories,
    getAllCategories,
    patchUpdateCategories,
    deleteCategoriesbyId,
};