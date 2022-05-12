const validate = {};
const { errorResponse } = require("../helpers/response");
const jwt = require("jsonwebtoken");

validate.productsData = (req, res, next) => {
    // cek apakah body sesuai dengan yang diinginkan
    const { name, sizes_id, description, delivery_methods_id, start_hours, end_hours, stock, pictures, categories_id, price, created_at } = req.body;
  
    if (!name) {
      return res.status(400).json({
        err: "Body Name !",
      });
    }
    if (!sizes_id) {
      return res.status(400).json({
        err: "Body Sizes !",
      });
    }
    if (!description) {
      return res.status(400).json({
        err: "Body Descrption !",
      });
    }
    if (!delivery_methods_id) {
      return res.status(400).json({
        err: "Body Delivery Method !",
      });
    }
    if (!start_hours) {
      return res.status(400).json({
        err: "Body Start Hours !",
      });
    }
    if (!end_hours) {
      return res.status(400).json({
        err: "Body End Hours !",
      });
    }
    if (!stock) {
      return res.status(400).json({
        err: "Body Stock !",
      });
    }
    if (!pictures) {
      return res.status(400).json({
        err: "Body Pictures !",
      });
    }
    if (!categories_id) {
      return res.status(400).json({
        err: "Body Categories !",
      });
    }
    if (!price) {
      return res.status(400).json({
        err: "Body Price !",
      });
    }
    if (!created_at) {
      return res.status(400).json({
        err: "Body Created At !",
      });
    }
    next();
  };

  validate.checkAuthorizations = (req, res, next) => {
    const roles = req.userPayload.authorizaions_id;
    //const role = bearerToken;
    if (roles !== 1) {
      //console.log(roles);
      return errorResponse(res, 401, { msg: "Your account is not admin" });
    }
    //const { id, email, authorizations_id } = payload;
    req.userPayload = payload;
    next();
    
  };

  module.exports = validate;