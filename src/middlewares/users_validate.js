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
  const roles = req.userPayload.auth;
  if ( parseInt(roles) !== 2) {
    return errorResponse(res, 401, { msg: "Your account is not users" });
  }
  next();

};

module.exports = {
  validateCreateUsers,
  validate,
  checkAuthorizations,
};