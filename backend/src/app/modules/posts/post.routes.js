const express = require("express");
const auth = require("../../middlewares/auth");
const PostController = require("../posts/post.controller");
const { UploadImageCloudinary } = require("../../middlewares/uploadCloudinary");

const router = express.Router();

router.get("/my-posts", auth(), PostController.getMyPosts);

router.post(
  "/",
  auth(),
  UploadImageCloudinary.single("postImage"),
  PostController.createPost
);

router.get("/", auth(), PostController.getAllPost);
router.get("/:id", auth(), PostController.getSinglePost);
router.patch(
  "/:id",
  auth(),
  UploadImageCloudinary.single("postImage"),
  PostController.updateSinglePost
);
router.delete("/:id", auth(), PostController.deleteSinglePost);

module.exports = router;
