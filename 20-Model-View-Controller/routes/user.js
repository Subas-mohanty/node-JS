const express = require("express");

const {
  handleGetUsers,
  getUsersByID,
  patchUsersByID,
  deleteUsersByID,
  handleCreateUser,
} = require("../controllers/user");

// we can't do app.route , we have to

const userRouter = express.Router();

userRouter
// using "/" inplace of "/api/users/"
  .route("/") 
  .get(handleGetUsers)
  .post(handleCreateUser);

  userRouter
  .route("/:id")
  .get(getUsersByID)
  .patch(patchUsersByID)
  .delete(deleteUsersByID);

module.exports = userRouter;
