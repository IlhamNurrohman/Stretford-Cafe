const validate = {};
const { errorResponse } = require("../helpers/response");
const jwt = require("jsonwebtoken");

validate.productsData = (req, res, next) => {
  // cek apakah  body sesuai dengan yang diinginkan
  const { name, sizes_id, description, delivery_methods_id, start_hours, end_hours, stock, categories_id, price, created_at } = req.body;
  const pictures = req.file;
  if (!name) {
    return res.status(400).json({
      err: " Empty body Name !",
    });
  }
  if (!sizes_id) {
    return res.status(400).json({
      err: " Empty body Sizes !",
    });
  }
  if (!description) {
    return res.status(400).json({
      err: " Empty body Descrption !",
    });
  }
  if (!delivery_methods_id) {
    return res.status(400).json({
      err: " Empty body Delivery Method !",
    });
  }
  if (!start_hours) {
    return res.status(400).json({
      err: " Empty body Start Hours !",
    });
  }
  if (!end_hours) {
    return res.status(400).json({
      err: " Empty body End Hours !",
    });
  }
  if (!stock) {
    return res.status(400).json({
      err: " Empty body Stock !",
    });
  }
  if (!pictures) {
    return res.status(400).json({
      err: " Empty body Pictures !",
    });
  }
  if (!categories_id) {
    return res.status(400).json({
      err: " Empty body Categories !",
    });
  }
  if (!price) {
    return res.status(400).json({
      err: " Empty body Price !",
    });
  }
  // if (!created_at) {
  //   return res.status(400).json({
  //     err: " Empty body Created At !",
  //   });
  // }
  next();
};

validate.checkAuthorizations = (req, res, next) => {
  const roles = req.userPayload.auth;
  if ( roles === "admin") {
    return errorResponse(res, 401, { msg: "Your account is not admin" });
  }
  next();

};

module.exports = validate;