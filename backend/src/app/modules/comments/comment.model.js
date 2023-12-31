const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
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

const Comments = mongoose.model("Comments", commentSchema);

module.exports = Comments;
