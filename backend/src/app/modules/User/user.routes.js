const express = require("express");
const UserController = require("./user.controller");
const { UploadImageCloudinary } = require("../../middlewares/uploadCloudinary");
const auth = require("../../middlewares/auth");

const router = express.Router();

router.post(
  "/",
  // auth("Super Admin", "Admin"),
  UploadImageCloudinary.single("profileImage"),
  UserController.createUser
);

router.get("/", auth(), UserController.getAllUsers);

router.get("/my-profile", auth(), UserController.getMyProfile);

module.exports = router;
