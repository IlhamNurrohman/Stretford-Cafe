const express = require("express");

const Router = express.Router();
const { checkToken } = require("../middlewares/auth");
const  upImageFile = require("../middlewares/upload");
const db = require("../config/db");
const { successResponse, errorResponse } = require("../helpers/response");

const usersController = require("../controllers/users");
const validate = require("../middlewares/validate");
const { editpassInput } = require("../middlewares/users_validate");
const adminValidate = require("../middlewares/products_validate");

Router.get("/all", checkToken, adminValidate.checkAuthorizations, usersController.getAllUsers);
Router.get("/profile-detail", checkToken, usersController.getUsersLoginOnli);
Router.delete("/:id", checkToken , adminValidate.checkAuthorizations, usersController.deleteUsersbyId);
Router.post("/", usersController.postNewUsers);
Router.patch("/", checkToken, upImageFile, usersController.patchUpdateUsers);
Router.patch("/edit-password", editpassInput, usersController.patchUserPassword);
Router.patch("/update-password", checkToken, usersController.patchUserPasswordProfile);

// Router.patch("/", checkToken, imageUpload.single("pictures"), (req, res) => {
//     const id = req.userPayload.id;
//     const { file = null, username, email, password, phone, date, address, gender, created_at, updated_at, authorizations_id } = req;
//     const pictures = file.path.replace("public", "").replace(/\\/g, "/");
//     const sqlQuery =
//         "UPDATE users SET username=COALESCE($1, username ), email=COALESCE($2, email ), password=COALESCE($3, password ), phone=COALESCE($4, phone ), date=COALESCE($5, date ), address=COALESCE($6, address ), gender=COALESCE($7, gender ), pictures=COALESCE($8 ,pictures), created_at=COALESCE($9, created_at ), updated_at=COALESCE($10, updated_at ), authorizations_id=COALESCE($11, authorizations_id ) where id=$12 returning username, email, phone, date, address, gender, pictures";
//     db.query(sqlQuery, [username, email, password, phone, date, address, gender, pictures, created_at, updated_at, authorizations_id, id])
//         .then((result) => {
//             //console.log(result);
//             successResponse(res, 200, result.rows[0], null);
//         })
//         .catch((err) => {
//             //console.log(err);
//             errorResponse(res, 500, err);
//         });
// });


module.exports = Router;