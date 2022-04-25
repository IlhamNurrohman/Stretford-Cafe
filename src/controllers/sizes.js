const sizesModel = require("../models/sizes");
const { createNewsizes, getAllsizesfromServer, updatesizes, deleteDatasizesfromServer } =
sizesModel;
const { successResponse, errorResponse } = require("../helpers/response");
const { status } = require("express/lib/response");

const postNewsizes = (req, res) => {
    createNewsizes(req.body)
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

const getAllsizes = (_, res) => {
    getAllsizesfromServer()
        .then((result) => {
            const { total, data } = result;
            successResponse(res, 200, data, total);
        })
        .catch((error) => {
            const { err, status } = error;
            errorResponse(res, status, err);
        });
}

const patchUpdatesizes = (req, res) => {
    updatesizes(req.params, req.body)
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

const deletesizesbyId = (req, res) => {
    const id = req.params;
    deleteDatasizesfromServer(id)
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
    postNewsizes,
    getAllsizes,
    patchUpdatesizes,
    deletesizesbyId,
};