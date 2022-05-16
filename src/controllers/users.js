const usersModel = require("../models/users");
const imageUpload = require("../middlewares/upload");
const { createNewUsers, getAllUsersfromServer, updateUsers, deleteDataUsersfromServer } =
  usersModel;
const { successResponse, errorResponse } = require("../helpers/response");
const { status } = require("express/lib/response");
const bcrypt = require("bcrypt");

const getAllUsers = (_, res) => {
  getAllUsersfromServer()
    .then((result) => {
      const { total, data } = result;
      successResponse(res, 200, data, total);
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