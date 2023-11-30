const mongoose = require("mongoose");

const reactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    reactType: {
      type: String,
      enum: ["like", "laugh", "love", "angry", "sad", "wow"],
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const Reaction = mongoose.model("Reaction", reactionSchema);

module.exports = Reaction;
