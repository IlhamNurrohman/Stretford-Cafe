const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { register, getPassByUserEmail } = require("../models/auth");
const { successResponse, errorResponse } = require("../helpers/response");
const { client } = require("../config/redis.js");
const { sendPasswordConfirmation } = require("../config/nodemailer");
const generator = require("generate-password");

const auth = {};

auth.register = (req, res) => {
  // expect sebuah body dengan
  // property email dan pass
  const {
    body: { username, email, password, phone, roles_id, timestamp },
  } = req;
  bcrypt
    .hash(password, 10)
    .then((hashedPassword) => {
      register(username, email, hashedPassword, phone, roles_id, timestamp)
        .then(() => {
          successResponse(res, 201, { msg: "Register Success" }, null);
        })
        .catch((error) => {
          //console.log(error);
          const { status, err } = error;
          errorResponse(res, status, err);
        });
    })
    .catch((err) => {
      console.log(err)
      errorResponse(res, 500, err);
    });
};

auth.signIn = async (req, res) => {
  try {
    // mendapatkan body email dan pass
    const {
      body: { email, password },
    } = req;
    // cek kecocokan email dan pass di db
    const data = await getPassByUserEmail(email);
    const result = await bcrypt.compare(password, data.password);
    if (!result) return errorResponse(res, 400, { msg: "Email or Password wrong !" });
    // generate jwt
    const payload = {
      id: data.id,
      email,
      roles_id: data.roles_id,
    };

    const jwtOptions = {
      issuer: process.env.JWT_ISSUER,
      expiresIn: "12h", // expired in 10000s
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, jwtOptions);
    await client.set(`jwt${data.id}`, token);
    // return
    successResponse(res, 200, { id: data.id, email, token, roles_id: data.roles_id }, null);
  } catch (error) {
    const { status = status ? status : 500, message } = error;
    errorResponse(res, status, { msg: message });
  }
};

auth.logout = async (req, res) => {
  try {
    const cachedLogin = await client.get(`jwt${req.userPayload.id}`);
    if (cachedLogin) {
      await client.del(`jwt${req.userPayload.id}`);
    }
    successResponse(res, 200, { message: "You have successfully logged out" }, null);
  } catch (err) {
    errorResponse(res, 500, err.message);
  }
};

auth.forgotPassword = async (req, res) => {
  try {
    const { email } = req.params;
    const confirmCode = generator.generate({
      length: 7,
      numbers: true,
    });

    await sendPasswordConfirmation(email, email, confirmCode);
    await client.set(`forgotpass${email}`, confirmCode);
    res.status(200).json({
      message: "Please check your email for password confirmation",
    });
  } catch (error) {
    const { message, status } = error;
    res.status(status ? status : 500).json({
      error: message,
    });
  }
};

module.exports = auth;