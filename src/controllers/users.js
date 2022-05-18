const usersModel = require("../models/users");
const imageUpload = require("../middlewares/upload");
const { createNewUsers, getAllUsersfromServer, updateUsers, deleteDataUsersfromServer } =
  usersModel;
const { successResponse, errorResponse } = require("../helpers/response");
const { status } = require("express/lib/response");
const bcrypt = require("bcrypt");

const getAllUsers = (req, res) => {
  getAllUsersfromServer(req.query)
  .then((result) => {
    const { data, totalData, totalPage } = result;
    const { find, categories, sort, order, page = 1, limit } = req.query;
    let nextPage = "/users/all?";
    let prevPage = "/users/all?";
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
    .catch((error) => {
      const { err, status } = error;
      errorResponse(res, status, err);
    });
}

const deleteUsersbyId = (req, res) => {
  const id = req.params;
  deleteDataUsersfromServer(id)
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

const postNewUsers = (req, res) => {
  createNewUsers(req.body)
  bcrypt
    .hash(password, 10)
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

const patchUpdateUsers = (req, res) => {
  const { file } = req;
  updateUsers(req, file)
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

module.exports = {
  postNewUsers,
  getAllUsers,
  patchUpdateUsers,
  deleteUsersbyId,
};