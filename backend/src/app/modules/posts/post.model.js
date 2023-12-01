const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    postCreator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
    },
    postImage: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    readUser: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
