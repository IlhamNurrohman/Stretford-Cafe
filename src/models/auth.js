const { body } = require("express-validator");
const db = require("../config/db");

const register = (username, email, hashedPassword, phone, date, address, gender, pictures, authorizations_id) => {
  return new Promise((resolve, reject) => {
      const sqlQuery =
        "INSERT INTO users (username, email, password, phone, date, address, gender, pictures, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) returning username, email, phone";
    const timestamp = new Date(Date.now());
    const values = [username, email, hashedPassword, phone, date, address, gender, pictures, authorizations_id, timestamp];
    db.query(sqlQuery, values)
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject({ status: 500, err });
      });
  });
};

const getUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    const sqlQuery = "SELECT * FROM users WHERE email = $1";
    db.query(sqlQuery, [email])
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject({ status: 500, err });
      });
  });
};

const getPassByUserEmail = async (email) => {
  try {
    const sqlQuery = "SELECT * FROM users WHERE email = $1";
    const result = await db.query(sqlQuery, [email]);
    // cek apakah ada pass
    if (result.rowCount === 0)
      throw { status: 400, err: { msg: "Email is not registered" } };
    return result.rows[0];
  } catch (error) {
    const { status = 500, err } = error;
    throw { status, err };
  }
};

module.exports = { register, getUserByEmail, getPassByUserEmail };