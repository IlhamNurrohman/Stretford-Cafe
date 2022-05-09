const { check, validationResult } = require('express-validator');
const rulesCreateUser = [check('email').isEmail().notEmpty(), check('password').notEmpty(), check('phone_number').toInt().notEmpty()];

const validateCreateUsers = [
  rulesCreateUser,
  (req, res, next) => {
    const { body } = req;
    const validBody = Object.keys(body).filter(
      (key) => key === "username" || key === "email" || key === "password" || key === "phone" || key === "date" || key === "address" || key === "gender" || key === "pictures"
    );
    const error = validationResult(req);
    if (validBody.length < 4) {
      return res.status(400).json({
        err: "Body must contain complete data !",
      });
    }

    if (!error.isEmpty()) {
      return res.status(400).json({
        msg: 'Query must contain email, password and phone_number',
      });
    }
    next();
  },
];

module.exports = {
  validateCreateUsers,
};