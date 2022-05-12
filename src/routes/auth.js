const Router = require("express").Router();

const authController = require("../controllers/auth");
const { checkDuplicate } = require("../middlewares/auth");

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
