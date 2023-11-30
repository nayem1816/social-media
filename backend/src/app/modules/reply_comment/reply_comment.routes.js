const express = require("express");
const auth = require("../../middlewares/auth");
const { UploadImageCloudinary } = require("../../middlewares/uploadCloudinary");
const ReplyCommentController = require("./reply_comment.controller");

const router = express.Router();

router.post(
  "/",
  auth(),
  UploadImageCloudinary.single("replyImage"),
  ReplyCommentController.createReplyComment
);
router.get(
  "/:commentId",
  auth(),
  ReplyCommentController.getAllReplyCommentByCommentId
);
router.patch(
  "/:replyCommentId",
  auth(),
  UploadImageCloudinary.single("replyImage"),
  ReplyCommentController.updateSingleReplyComment
);
router.delete(
  "/:replyCommentId",
  auth(),
  ReplyCommentController.deleteSingleReplyComment
);

module.exports = router;
