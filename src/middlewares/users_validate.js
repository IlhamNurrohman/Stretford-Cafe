const validate = {};
const { errorResponse } = require("../helpers/response");
const { check, validationResult } = require('express-validator');
const rulesCreateUser = [check('email').isEmail().notEmpty(), check('password').notEmpty(), check('phone').toInt().notEmpty()];

const validateCreateUsers = [
  rulesCreateUser,
  (req, res, next) => {
    const { body } = req;
    const validBody = Object.keys(body).filter(
      (key) => key === "username" || key === "email" || key === "password" || key === "phone" || key === "date" || key === "address" || key === "gender" || key === "pictures" || key === "roles_id"
    );
    const error = validationResult(req);
    // if (validBody.length < 4) {
    //   return res.status(400).json({
    //     err: "Body must contain complete data !",
    //   });
    // }

    // if (!error.isEmpty()) {
    //   return res.status(400).json({
    //     msg: 'Create user invalid',
    //     error: error.array(),
    //   });
    // }
    next();
  },
];

const checkAuthorizations = (req, res, next) => {
  const roles = req.userPayload.roles;
  if ( roles !== "users") {
    return errorResponse(res, 401, { msg: "Your account is not users" });
  }
  next();

};

const editpassInput = (req, res, next) => {
  // cek apakah Undifined body sesuai dengan yang diinginkan
  const { email, newPassword, confirmCode } = req.body;
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

  if (!newPassword) {
    return errorResponse(res, 400, { msg: "Password cannot be empty!" });
  }

  if (!confirmCode) {
      return errorResponse(res, 400, { msg: "Confirm code cannot be empty!" });
    }

  next();
};

module.exports = {
  validateCreateUsers,
  validate,
  checkAuthorizations,
  editpassInput
};