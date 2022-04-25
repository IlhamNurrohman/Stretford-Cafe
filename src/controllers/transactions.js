const transactionsModel = require("../models/transactions");
const { createNewTransactions, getAllTransactionsfromServer, updateTransactions, deleteDataTransactionsfromServer } =
    transactionsModel;
const { successResponse, errorResponse } = require("../helpers/response");
const { status } = require("express/lib/response");

const postNewTransactions = (req, res) => {
    createNewTransactions(req.params, req.body)
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

const getAllTransactions = (_, res) => {
    getAllTransactionsfromServer()
        .then((result) => {
            const { total, data } = result;
            successResponse(res, 200, data, total);
        })
        .catch((error) => {
            const { err, status } = error;
            errorResponse(res, status, err);
        });
}

const patchUpdateTransactions = (req, res) => {
    updateTransactions(req.params, req.body)
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
    deleteDataTransactionsfromServer(id)
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
    postNewTransactions,
    getAllTransactions,
    patchUpdateTransactions,
    deleteTransactionbyId,
};