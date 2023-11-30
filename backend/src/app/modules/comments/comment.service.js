const { default: mongoose } = require("mongoose");
const ApiError = require("../../../errors/apiError");
const User = require("../User/user.model");
const Post = require("../posts/post.model");
const Comments = require("./comment.model");
const { deleteImageCloudinary } = require("../../middlewares/uploadCloudinary");

const createCommentService = async (payload, imageData, userId) => {
  if (!payload.commentText && !imageData.url) {
    throw new ApiError(400, "Comment text required");
  }

  const isExistUser = await User.findById(userId);
  if (!isExistUser) {
    throw new ApiError(400, "User not found");
  }

  const isExistPost = await Post.findById(payload.postId);
  if (!isExistPost) {
    throw new ApiError(400, "Post not found");
  }

  const newData = {
    postId: payload.postId,
    commentCreator: userId,
  };

  if (payload.commentText) {
    newData.commentText = payload.commentText;
  }
  if (imageData.url) {
    newData.commentImage = imageData;
  }

  if (payload.content) {
    newData.content = payload.content;
  }

  newData.postCreator = userId;

  if (imageData.url) {
    newData.postImage = imageData;
  }

  const result = await Comments.create(newData);

  return result;
};

const getAllCommentByPostIdService = async (postId) => {
  const isExistPost = await Post.findById(postId);
  if (!isExistPost) {
    throw new ApiError(400, "Post not found");
  }

  const result = await Comments.aggregate([
    {
      $match: {
        postId: new mongoose.Types.ObjectId(postId),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "commentCreator",
        foreignField: "_id",
        as: "commentCreator",
      },
    },
    {
      $unwind: "$commentCreator",
    },
    {
      $project: {
        commentCreator: {
          _id: 1,
          fullName: 1,
          profileImage: 1,
        },
        commentText: 1,
        commentImage: 1,
        postId: 1,
        createdAt: 1,
      },
    },
  ]);

  return result;
};

const updateSingleCommentService = async (
  commentId,
  payload,
  imageData,
  userId
) => {
  if (!payload.commentText && !imageData.url) {
    throw new ApiError(400, "Comment text required");
  }

  const isExistComment = await Comments.findById(commentId);

  if (!isExistComment) {
    throw new ApiError(400, "Comment not found");
  }

  if (isExistComment.commentCreator.toString() !== userId.toString()) {
    throw new ApiError(403, "You are not allowed to update this comment");
  }

  const newData = {};

  if (payload.commentText) {
    newData.commentText = payload.commentText;
  }

  if (imageData.url) {
    newData.commentImage = imageData;

    if (isExistComment.commentImage?.public_id) {
      await deleteImageCloudinary(isExistComment.commentImage?.public_id);
    }
  }

  const result = await Comments.findOneAndUpdate({ _id: commentId }, newData, {
    new: true,
  });

  return result;
};

const deleteSingleCommentService = async (commentId, userId) => {
  const isExistComment = await Comments.findById(commentId);

  if (!isExistComment) {
    throw new ApiError(400, "Comment not found");
  }

  if (isExistComment.commentCreator.toString() !== userId.toString()) {
    throw new ApiError(403, "You are not allowed to update this comment");
  }

  if (isExistComment.commentImage?.public_id) {
    await deleteImageCloudinary(isExistComment.commentImage?.public_id);
  }

  const result = await Comments.findOneAndDelete({ _id: commentId });

  return result;
};

module.exports = {
  createCommentService,
  getAllCommentByPostIdService,
  updateSingleCommentService,
  deleteSingleCommentService,
};
