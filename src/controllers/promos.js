const promosModel = require("../models/promos");
const { createNewPromos, findPromosfromServer, updatePromos, deleteDataPromosfromServer, sortPromos } =
    promosModel;
const { successResponse, errorResponse } = require("../helpers/response");

const postNewPromos = (req, res) => {
    const { file } = req;
    createNewPromos(req, file)
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
    const { file } = req;
    updatePromos(req, file)
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
    .then((result) => {
        const { data, totalData, totalPage } = result;
        const { find, categories, sort, order, page = 1, limit } = req.query;
        let nextPage = "/promos?";
        let prevPage = "/promos?";
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