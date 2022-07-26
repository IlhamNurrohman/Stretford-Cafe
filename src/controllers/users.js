const usersModel = require("../models/users");
const imageUpload = require("../middlewares/upload");
const { createNewUsers, getAllUsersfromServer, updateUsers, deleteDataUsersfromServer, getUsersLogin, updateUserPassword, updateUserPasswordProfile } =
  usersModel;
const { successResponse, errorResponse } = require("../helpers/response");
const { status } = require("express/lib/response");
const bcrypt = require("bcrypt");
const { client } = require("../config/redis.js");

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

const getUsersLoginOnli = (req, res) => {
  const id = req.userPayload.id;
  getUsersLogin(id)
    .then((result) => {
      const { data, msg } = result
      res.status(200).json({
        data,
        msg,
      })
    })
    .catch((error) => {
      console.log(error)
      // res.status(status).json({
      //   err,
      //   data: [],
      // });
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

const patchUserPassword = async (req, res) => {
  try {
    const { email, newPassword, confirmCode } = req.body;
    const confirm = await client.get(`forgotpass${email}`);
    if (confirm !== confirmCode) {
      res.status(403).json({ error: "Invalid Confirmation Code !" });
      return;
    }
    const { message } = await updateUserPassword(newPassword, email);
    if (message) {
      await client.del(`forgotpass${email}`);
    }
    res.status(200).json({
      message,
    });
  } catch (error) {
    const { message, status } = error;
    res.status(status ? status : 500).json({
      error: message,
    });
  }
};

const patchUserPasswordProfile = async (req, res) => {
  try {
    const { message } = await updateUserPasswordProfile(req.userPayload.id, req.body);
    res.status(200).json({
      message,
    });
  } catch (error) {
    const { message, status } = error;
    res.status(status ? status : 500).json({
      error: message,
    });
  }
};

module.exports = {
  postNewUsers,
  getAllUsers,
  patchUpdateUsers,
  deleteUsersbyId,
  getUsersLoginOnli,
  patchUserPassword,
  patchUserPasswordProfile
};