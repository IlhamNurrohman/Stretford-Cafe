const { response } = require("express");
const db = require("../config/db");

const getAllUsersfromServer = () =>{
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM users")
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
      const { username, email, password, phone, date, address, gender, pictures } = body;
      const sqlQuery =
        "INSERT INTO users(username, email, password, phone, date, address, gender, pictures) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) returning *";
      db.query(sqlQuery, [username, email, password, phone, date, address, gender, pictures])
        .then(({ rows }) => {
          const response = {
            data: rows[0],
          };
          resolve(response);
        })
        .catch((err) => reject({ status: 500, err }));
    });
  };

  const updateUsers = (params, body) => {
    return new Promise((resolve, reject) => {
      const { id } = params
      const { username, email, password, phone, date, address, gender, pictures } = body;
      const sqlQuery =
        "UPDATE users SET username=COALESCE(NULLIF($1, ''), username ), email=COALESCE(NULLIF($2, ''), email ), password=COALESCE(NULLIF($3, ''), password ), phone=COALESCE($4, phone ), date=COALESCE($5, date ), address=COALESCE(NULLIF($6, ''), address ), gender=COALESCE(NULLIF($7, ''), gender ), pictures=COALESCE(NULLIF($8, ''), pictures ) where id=$9 returning *";
      db.query(sqlQuery, [username, email, password, phone, date, address, gender, pictures, id])
      //db.query(`UPDATE users SET username = ${data.username}, email = ${data.email}, password = ${data.password}, phone = ${data.phone}, date = ${data.date}, address = ${data.address}, gender = ${data.gender}, pictures = ${data.pictures} where id=${id}`)
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