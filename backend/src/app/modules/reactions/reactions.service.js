const { default: mongoose } = require("mongoose");
const ApiError = require("../../../errors/apiError");
const Reaction = require("./reactions.model");

const createReactService = async (payload, userId) => {
  if (!payload.postId) {
    throw new ApiError(400, "Post id required");
  }

  const isExistReact = await Reaction.findOne({
    postId: payload.postId,
    userId: userId,
  });

  let result;
  let message;

  if (isExistReact) {
    if (isExistReact.reactType === payload.reactType) {
      result = await Reaction.findByIdAndDelete(isExistReact._id);
      message = "React deleted successfully";
    } else {
      result = await Reaction.findByIdAndUpdate(
        isExistReact._id,
        {
          reactType: payload.reactType,
        },
        { new: true }
      );
      message = "React updated successfully";
    }
  } else {
    result = await Reaction.create({
      postId: payload.postId,
      userId: userId,
      reactType: payload.reactType,
    });
    message = "React created successfully";
  }

  return {
    data: result,
    message: message,
  };
};

const getAllReactByPostIdService = async (postId, userId) => {
  const result = await Reaction.aggregate([
    {
      $match: {
        postId: new mongoose.Types.ObjectId(postId),
      },
    },
    {
      $group: {
        _id: "$reactType",
        count: { $sum: 1 },
        userId: { $push: "$userId" },
      },
    },
  ]);

  return result;
};

const getMyReactionByPostIdService = async (postId, userId) => {
  const result = await Reaction.findOne({
    postId: postId,
    userId: userId,
  });

  return result;
};

module.exports = {
  createReactService,
  getAllReactByPostIdService,
  getMyReactionByPostIdService,
};
