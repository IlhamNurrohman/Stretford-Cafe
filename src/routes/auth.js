const Router = require("express").Router();

const authController = require("../controllers/auth");
const { checkDuplicate } = require("../middlewares/auth");
const validate = require("../middlewares/users_validate");

// register
Router.post("/new", checkDuplicate, authController.register);
// sign in
Router.post("/", authController.signIn);
// sign out
Router.delete("/", (_, res) => {
  res.json({
    msg: "Berhasil Logout",
  });
});

module.exports = Router;


// auth.register = (req, res) => {
//   // expect sebuah body dengan
//   // property email dan pass
//   const {
//     body: { username, email, password, phone, date, address, gender, pictures, timestamp, updated_at, authorizations_id },
//   } = req;
//   bcrypt
//     .hash(password, 10)
//     .then((hashedPassword) => {
//       register(username, email, hashedPassword, phone, date, address, gender, pictures, timestamp, updated_at, authorizations_id)
//         .then(() => {
//           successResponse(res, 201, { msg: "Register Success" }, null);
//         })
//         .catch((error) => {
//           const { status, err } = error;
//           errorResponse(res, status, err);
//         });
//     })
//     .catch((err) => {
//       errorResponse(res, 500, err);
//     });
// };

// const register = (username, email, hashedPassword, phone, date, address, gender, pictures, updated_at, authorizations_id) => {
//   return new Promise((resolve, reject) => {
//       const sqlQuery =
//         "INSERT INTO users (username, email, password, phone, date, address, gender, pictures, created_at, updated_at, authorizations_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) returning username, email, phone";
//     const timestamp = new Date(Date.now());
//     const values = [username, email, hashedPassword, phone, date, address, gender, pictures, timestamp, updated_at, authorizations_id];
//     db.query(sqlQuery, values)
//       .then(() => {
//         resolve();
//       })
//       .catch((err) => {
//         reject({ status: 500, err });
//       });
//   });
// };
