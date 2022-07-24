const jwt = require("jsonwebtoken");
const { errorResponse } = require("../helpers/response");
const { getUserByEmail } = require("../models/auth");

const registerInput = (req, res, next) => {
  // cek apakah Undifined body sesuai dengan yang diinginkan
  const { email, password } = req.body;
  let emailFormat = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;
  if (!email) {
    return errorResponse(res, 400, { msg: "Email cannot be empty!" });
  }
  for (const key in req.body) {
    if (key === "email") {
      if (!req.body[key].match(emailFormat)) {
        return errorResponse(res, 400, {
          msg: "Please insert a valid email!",
        });
      }
    }
  }

  if (!password) {
    return errorResponse(res, 400, { msg: "Password cannot be empty!" });
  }

  next();
};

const loginInput = (req, res, next) => {
  // cek apakah Undifined body sesuai dengan yang diinginkan
  const { email, password } = req.body;
  let emailFormat = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/;
  if (!email) {
    return errorResponse(res, 400, {
      msg: "Email cannot be empty!",
    });
  }
  
  for (const key in req.body) {
    if (key === "email") {
      if (!req.body[key].match(emailFormat)) {
        return errorResponse(res, 400, {
          msg: "Please insert a valid email!",
        });
      }
    }
  }
  if (!password) {
    return errorResponse(res, 400, { msg: "Password cannot be empty!" });
  }

  next();
};

const checkDuplicate = (req, res, next) => {
  getUserByEmail(req.body.email)
    .then((result) => {
      if (result.rowCount > 0)
        return errorResponse(res, 400, { msg: "Email already use !" });
      next();
    })
    .catch((error) => {
      const { status, err } = error;
      errorResponse(res, status, err);
    });
};

const checkToken = (req, res, next) => {
  const bearerToken = req.header("Authorization");
  // bearer token
  if (!bearerToken) {
    return errorResponse(res, 401, { msg: "Sign in needed" });
  }
  const token = bearerToken.split(" ")[1];
  // verifikasi token
  jwt.verify(
    token,
    process.env.JWT_SECRET,
    { issuer: process.env.JWT_ISSUER },
    (err, payload) => {
      // error handling
      if (err && err.name === "TokenExpiredError"){
        return errorResponse(res, 401, { msg: "You need to Sign in again" });
      }
      console.log(err);
      const { id, email, username, phone, date, address, gender, pictures, auth } = payload;
      req.userPayload = { id, email, username, phone, date, address, gender, pictures, auth };
      next();
    }
  );
};

// const roleAuth = (req, res, next) => {
//   checkAuthorizations(req.payload.authorizations_id,)
//     .then((role) => {
//       if (role !== 1) {
//         return errorResponse(res, 401, { msg: "Your account is not admin" });
//       }
//       if (role !== 2) {
//         return errorResponse(res, 401, { msg: "Your account is not user" });
//       };
//       next();
//     })
//     .catch((error) => {
//       const { status, err } = error;
//       errorResponse(res, status, err);
//     });
// };

module.exports = { checkDuplicate, checkToken, registerInput, loginInput };