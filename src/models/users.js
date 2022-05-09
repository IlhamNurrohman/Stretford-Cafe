const { response } = require("express");
const db = require("../config/db");

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

  const updateUsers = (params, body) => {
    return new Promise((resolve, reject) => {
      const { id } = params
      const { username, email, password, phone, date, address, gender, pictures, created_at, updated_at } = body;
      const sqlQuery =
        "UPDATE users SET username=COALESCE($1, username ), email=COALESCE($2, email ), password=COALESCE($3, password ), phone=COALESCE($4, phone ), date=COALESCE($5, date ), address=COALESCE($6, address ), gender=COALESCE($7, gender ), pictures=COALESCE($8, pictures ), created_at=COALESCE($9, created_at ), updated_at=COALESCE($10, updated_at ) where id=$11 returning username, email, phone, date, address, gender, pictures";
      db.query(sqlQuery, [username, email, password, phone, date, address, gender, pictures, created_at, updated_at, id])
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