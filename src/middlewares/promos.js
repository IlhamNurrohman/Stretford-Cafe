const validate = {};
const { errorResponse } = require("../helpers/response");

validate.promosData = (req, res, next) => {
  // cek apakah Undifined body sesuai dengan yang diinginkan
  const { name_product, normal_price, description, sizes_id, delivery_methods_id, discount, start_date, end_date, coupon_code, categories_id, created_at } = req.body;
  const pictures = req.file;

  if (!name_product) {
    return res.status(400).json({
      err: "Undifined Undifined body Name Products !",
    });
  }
  if (!normal_price) {
    return res.status(400).json({
      err: "Undifined Undifined body Normal Price !",
    });
  }
  if (!sizes_id) {
    return res.status(400).json({
      err: "Undifined body Sizes !",
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
  if (!discount) {
    return res.status(400).json({
      err: "Undifined body Discount !",
    });
  }
  if (!start_date) {
    return res.status(400).json({
      err: "Undifined body Start Date !",
    });
  }
  if (!end_date) {
    return res.status(400).json({
      err: "Undifined body End Date !",
    });
  }
  if (!coupon_code) {
    return res.status(400).json({
      err: "Undifined body Coupon Code !",
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
  if (!created_at) {
    return res.status(400).json({
      err: "Undifined body Created At !",
    });
  }
  next();
};

validate.checkAuthorizations = (req, res, next) => {
  const roles = req.userPayload.auth;
  if ( parseInt(roles) !== 1) {
    return errorResponse(res, 401, { msg: "Your account is not admin" });
  }
  next();

};

module.exports = validate;