const express = require("express");
const auth = require("../../middlewares/auth");
const { UploadImageCloudinary } = require("../../middlewares/uploadCloudinary");
const CommentController = require("./comment.controller");

const router = express.Router();

router.post(
  "/",
  auth(),
  UploadImageCloudinary.single("commentImage"),
  CommentController.createComment
);
router.get("/:postId", auth(), CommentController.getAllCommentByPostId);
router.patch(
  "/:commentId",
  auth(),
  UploadImageCloudinary.single("commentImage"),
  CommentController.updateSingleComment
);
router.delete("/:commentId", auth(), CommentController.deleteSingleComment);

module.exports = router;
