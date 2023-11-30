const mongoose = require("mongoose");

const replyCommentSchema = new mongoose.Schema(
  {
    commentCreator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    commentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comments",
      required: true,
    },
    commentText: {
      type: String,
    },
    commentImage: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  },
  { timestamps: true, versionKey: false }
);

const ReplyComments = mongoose.model("ReplyComments", replyCommentSchema);

module.exports = ReplyComments;
