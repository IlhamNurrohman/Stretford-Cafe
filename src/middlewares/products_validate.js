const validate = {};
const { errorResponse } = require("../helpers/response");
const jwt = require("jsonwebtoken");

validate.productsData = (req, res, next) => {
  // cek apakah Undifined body sesuai dengan yang diinginkan
  const { name, sizes_id, description, delivery_methods_id, start_hours, end_hours, stock, categories_id, price, created_at } = req.body;
  const pictures = req.file;
  if (!name) {
    return res.status(400).json({
      err: "Undifined Undifined body Name !",
    });
  }
  if (!sizes_id) {
    return res.status(400).json({
      err: "Undifined Undifined body Sizes !",
    });
  }
  if (!description) {
    return res.status(400).json({
      err: "Undifined body Descrption !",
    });
  }
  if (!delivery_methods_id) {
    return res.status(400).json({
      err: "Undifined body Delivery Method !",
    });
  }
  if (!start_hours) {
    return res.status(400).json({
      err: "Undifined body Start Hours !",
    });
  }
  if (!end_hours) {
    return res.status(400).json({
      err: "Undifined body End Hours !",
    });
  }
  if (!stock) {
    return res.status(400).json({
      err: "Undifined body Stock !",
    });
  }
  if (!pictures) {
    return res.status(400).json({
      err: "Undifined body Pictures !",
    });
  }
  if (!categories_id) {
    return res.status(400).json({
      err: "Undifined body Categories !",
    });
  }
  if (!price) {
    return res.status(400).json({
      err: "Undifined body Price !",
    });
  }
  if (!created_at) {
    return res.status(400).json({
      err: "Undifined body Created At !",
    });
  }
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