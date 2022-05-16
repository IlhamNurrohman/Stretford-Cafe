const { response } = require("express");
const db = require("../config/db");
const imageUpload = require("../middlewares/upload");
const multer = require("multer");
const path = require("path");

const getAllUsersfromServer = () =>{
  return new Promise((resolve, reject) => {
    db.query("SELECT username, email, phone, date, address, gender, pictures FROM users")
    .then((result) => {
      const response = {
        total: result.rowCount,
        data: result.rows,
      };
      resolve(response);
    })
    .catch((err) => {
      reject({ status: 500, err});
    })
  });
};

const deleteDataUsersfromServer = (params) => {
  return new Promise ((resolve, reject) => {
    const { id } = params;
    const sqlQuery = "DELETE FROM users WHERE id=$1 returning *";
    db.query(sqlQuery, [id])
    .then((data) => {
      if (data.rows.length === 0){
        return resolve({ status: 404, err: ""})
      }
      const response = {
        data: data.rows[0],
      }
    })
    .catch((err) => {
      reject({ status: 500, err});
    })
  })
}

const createNewUsers = (body) => {
    return new Promise((resolve, reject) => {
      const { username, email, password, phone, date, address, gender, pictures, created_at, updated_at } = body;
      const sqlQuery =
        "INSERT INTO users(username, email, password, phone, date, address, gender, pictures, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) returning username, email, phone";
      db.query(sqlQuery, [username, email, password, phone, date, address, gender, pictures, created_at, updated_at])
        .then(({ rows }) => {
          const response = {
            data: rows[0],
          };
          resolve(response);
        })
        .catch((err) => reject({ status: 500, err }));
    });
  };

  const updateUsers = (req, file) => {
    return new Promise((resolve, reject) => {
      const id = req.userPayload.id;
      const { username, email, password, phone, date, address, gender, roles_id, created_at, updated_at } = req.body;
      const pictures = file ? file.path.replace("public", "").replace(/\\/g, "/") : null ;
      const sqlQuery =
        "UPDATE users SET username=COALESCE($1, username ), email=COALESCE($2, email ), password=COALESCE($3, password ), phone=COALESCE($4, phone ), date=COALESCE($5, date ), address=COALESCE($6, address ), gender=COALESCE($7, gender ), pictures=$8, roles_id=COALESCE($9, roles_id ),created_at=COALESCE($10, created_at ), updated_at=COALESCE($11, updated_at ) where id=$12 returning *";
    db.query(sqlQuery, [username, email, password, phone, date, address, gender, pictures, roles_id, created_at, updated_at, id])
      .then((result) => {
         resolve({
           data: result.rows,
           msg: null,
         })
        })
        .catch((err) => reject({ status: 500, err }));
    });
  };

  module.exports = {
    createNewUsers,
    getAllUsersfromServer,
    updateUsers,
    deleteDataUsersfromServer,
  };