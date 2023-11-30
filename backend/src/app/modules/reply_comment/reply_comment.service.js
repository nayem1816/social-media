const { default: mongoose } = require("mongoose");
const ApiError = require("../../../errors/apiError");
const User = require("../User/user.model");
const Post = require("../posts/post.model");
const { deleteImageCloudinary } = require("../../middlewares/uploadCloudinary");
const Comments = require("../comments/comment.model");
const ReplyComments = require("./reply_comment.model");

const createReplyCommentService = async (payload, imageData, userId) => {
  if (!payload.replyText && !imageData.url) {
    throw new ApiError(400, "Reply text required");
  }

  const isExistUser = await User.findById(userId);
  if (!isExistUser) {
    throw new ApiError(400, "User not found");
  }

  const isExistPost = await Post.findById(payload.postId);
  if (!isExistPost) {
    throw new ApiError(400, "Post not found");
  }

  const isExistComment = await Comments.findById(payload.commentId);
  if (!isExistComment) {
    throw new ApiError(400, "Comment not found");
  }

  const newData = {
    postId: payload.postId,
    commentId: payload.commentId,
    replyCreator: userId,
  };

  if (payload.replyText) {
    newData.replyText = payload.replyText;
  }
  if (imageData.url) {
    newData.replyImage = imageData;
  }

  const result = await ReplyComments.create(newData);

  return result;
};

const getAllReplyCommentByCommentIdService = async (commentId) => {
  const result = await ReplyComments.aggregate([
    {
      $match: {
        commentId: new mongoose.Types.ObjectId(commentId),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "replyCreator",
        foreignField: "_id",
        as: "replyCreator",
      },
    },
    {
      $unwind: "$replyCreator",
    },
    {
      $project: {
        replyCreator: {
          _id: 1,
          fullName: 1,
          profileImage: 1,
        },
        replyText: 1,
        replyImage: 1,
        postId: 1,
        commentId: 1,
        createdAt: 1,
      },
    },
  ]);

  return result;
};

const updateSingleReplyCommentService = async (
  replyCommentId,
  payload,
  imageData,
  userId
) => {
  if (!payload.replyText && !imageData.url) {
    throw new ApiError(400, "Comment text required");
  }

  const isExistReplyComment = await ReplyComments.findById(replyCommentId);

  if (!isExistReplyComment) {
    throw new ApiError(400, "Comment reply update successfully");
  }

  if (isExistReplyComment.replyCreator.toString() !== userId.toString()) {
    throw new ApiError(403, "You are not allowed to update this comment");
  }

  const newData = {};

  if (payload.replyText) {
    newData.replyText = payload.replyText;
  }

  if (imageData.url) {
    newData.replyImage = imageData;

    if (isExistReplyComment.replyImage?.public_id) {
      await deleteImageCloudinary(isExistReplyComment.replyImage?.public_id);
    }
  }

  const result = await ReplyComments.findOneAndUpdate(
    { _id: replyCommentId },
    newData,
    {
      new: true,
    }
  );

  return result;
};

const deleteSingleReplyCommentService = async (replyCommentId, userId) => {
  const isExistReplyComment = await ReplyComments.findById(replyCommentId);

  if (!isExistReplyComment) {
    throw new ApiError(400, "Comment reply not found");
  }

  if (isExistReplyComment.replyCreator.toString() !== userId.toString()) {
    throw new ApiError(403, "You are not allowed to update this comment");
  }

  if (isExistReplyComment.replyImage?.public_id) {
    await deleteImageCloudinary(isExistReplyComment.replyImage?.public_id);
  }

  const result = await ReplyComments.findOneAndDelete({ _id: replyCommentId });

  return result;
};

module.exports = {
  createReplyCommentService,
  getAllReplyCommentByCommentIdService,
  updateSingleReplyCommentService,
  deleteSingleReplyCommentService,
};
