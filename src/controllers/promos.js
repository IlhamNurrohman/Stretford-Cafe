const promosModel = require("../models/promos");
const { createNewPromos, findPromosfromServer, updatePromos, deleteDataPromosfromServer, sortPromos } =
    promosModel;
const { successResponse, errorResponse } = require("../helpers/response");

const postNewPromos = (req, res) => {
    createNewPromos(req.body)
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

const findPromos = (req, res) => {
    findPromosfromServer(req.query)
        .then((result) => {
            const { total, data } = result;
            successResponse(res, 200, data, total);
        })
        .catch((error) => {
            const { err, status } = error;
            errorResponse(res, status, err);
        });
}

const patchUpdatePromos = (req, res) => {
    updatePromos(req.params, req.body)
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

const deletePromosbyId = (req, res) => {
    const id = req.params;
    deleteDataPromosfromServer(id)
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

const sortPromosByQuery = (req, res) => {
    sortPromos(req.query)
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
    postNewPromos,
    findPromos,
    patchUpdatePromos,
    deletePromosbyId,
    sortPromosByQuery
};