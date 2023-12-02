const express = require("express");
const AuthController = require("./auth.controller");

const router = express.Router();

router.post("/login", AuthController.login);
router.post("/reset-password", AuthController.resetPassword);
router.post(
  "/reset-password/:userId/:token",
  AuthController.resetPasswordByUserIdAndToken
);

module.exports = router;
