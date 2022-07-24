const { response } = require("express");
const db = require("../config/db");
const imageUpload = require("../middlewares/upload");
const multer = require("multer");
const path = require("path");
const { ErrorHandler } = require("../helpers/errorHandler");
const bcrypt = require("bcrypt");

const getAllUsersfromServer = (query) => {
  return new Promise((resolve, reject) => {
    const { find, categories, sort = "roles_id", order = "desc", page = 1, limit = 2 } = query;
    let offset = (Number(page) - 1) * Number(limit);
    let totalParam = [];
    let arr = [];
    let totalQuery = "SELECT count(users.id) as total_users from users join roles on users.roles_id = roles.id";
    let sqlQuery = "SELECT users.username, users.email, users.phone, users.date, users.address, users.gender, users.pictures, roles.name FROM users join roles on users.roles_id = roles.id";
    if (!find && !categories) {
      sqlQuery += " order by " + sort + " " + order + " LIMIT $1 OFFSET $2";
      arr.push(Number(limit), offset)
    }
    if (find && !categories) {
      sqlQuery += " where lower(users.username) like lower('%' || $1 || '%') order by " + sort + " " + order + " LIMIT $2 OFFSET $3";
      totalQuery += " where lower(users.username) like lower('%' || $1 || '%')";
      arr.push(find, Number(limit), offset);
      totalParam.push(find);
    }
    if (categories && !find) {
      sqlQuery += " where lower(roles.name) = lower($1) order by " + sort + " " + order + " LIMIT $2 OFFSET $3";
      totalQuery += " where lower(roles.name) = lower($1)";
      arr.push(categories, Number(limit), offset);
      totalParam.push(categories);
    }
    if (find && categories) {
      sqlQuery += " where lower(users.username) like lower('%' || $1 || '%') and lower(roles.name) = lower($2) order by " + sort + " " + order + " LIMIT $3 OFFSET $4";
      totalQuery += " where lower(users.username) like lower('%' || $1 || '%') and lower(roles.name) = lower($2)";
      arr.push(find, categories, Number(limit), offset);
      totalParam.push(find, categories);
    }
    db.query(sqlQuery, arr)
      .then((result) => {
        const response = {
          total: result.rowCount,
          data: result.rows,
        };
        db.query(totalQuery, totalParam)
          .then((result) => {
            response.totalData = Number(result.rows[0]["total_users"]);
            response.totalPage = Math.ceil(response.totalData / Number(limit));
            resolve(response);
          })
          .catch(err => {
            reject({ status: 500, err });
          });
      })
      .catch((err) => {
        reject({ status: 500, err });
      })
  });
};

const deleteDataUsersfromServer = (params) => {
  return new Promise((resolve, reject) => {
    const { id } = params;
    const sqlQuery = "DELETE FROM users WHERE id=$1 returning *";
    db.query(sqlQuery, [id])
      .then((data) => {
        if (data.rows.length === 0) {
          return resolve({ status: 404, err: "" })
        }
        const response = {
          data: data.rows[0],
        }
      })
      .catch((err) => {
        reject({ status: 500, err });
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
    const { username, email, password, phone, date, address, gender, roles_id, created_at, updated_at, firstname, lastname } = req.body;
    //const pictures = file ? file.path.replace("public", "").replace(/\\/g, "/") : null;
    const pictures = file ? file.path : null;
    const sqlQuery =
      "UPDATE users SET username=COALESCE($1, username ), email=COALESCE($2, email ), password=COALESCE($3, password ), phone=COALESCE($4, phone ), date=COALESCE($5, date ), address=COALESCE($6, address ), gender=COALESCE($7, gender ), pictures=$8, roles_id=COALESCE($9, roles_id ),created_at=COALESCE($10, created_at ), updated_at=COALESCE($11, updated_at ), firstname=COALESCE($12, firstname ), lastname=COALESCE($13, lastname ) where id=$14 returning *";
    db.query(sqlQuery, [username, email, password, phone, date, address, gender, pictures, roles_id, created_at, updated_at, firstname, lastname ,id])
      .then((result) => {
        resolve({
          data: result.rows,
          msg: null,
        })
      })
      .catch((err) => reject({ status: 500, err }));
  });
};

const getUsersLogin = (id) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = "select * from users where id = $1";
    db.query(sqlQuery, [Number(id)])
    .then((result) => {
      resolve({
        data: result.rows,
        msg: null,
      })
    })
      .catch((err) => {
        reject({ status: 500, err });
      })
  })
}

const updateUserPassword = async (newPassword, email) => {
  try {
    const hashedNewPassword = await bcrypt.hash(newPassword, 12);
    const resetPass = await db.query("UPDATE users set password = $1 WHERE email = $2 RETURNING *", [hashedNewPassword, email]);
    if (!resetPass.rowCount) throw new ErrorHandler({ status: 404, message: "Email Not Found" });
    return {
      message: "Your Password successfully recovered",
    };
  } catch (error) {
    const { status, message } = error;
    throw new ErrorHandler({ status: status ? status : 500, message });
  }
};

module.exports = {
  createNewUsers,
  getAllUsersfromServer,
  updateUsers,
  deleteDataUsersfromServer,
  getUsersLogin,
  updateUserPassword
};