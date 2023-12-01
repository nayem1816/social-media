const { default: mongoose } = require("mongoose");
const ApiError = require("../../../errors/apiError");
const { paginationHelpers } = require("../../../helpers/paginationHelpers");
const User = require("../User/user.model");
const { postSearchableFields } = require("./post.constant");
const Post = require("./post.model");
const { deleteImageCloudinary } = require("../../middlewares/uploadCloudinary");

const createPostService = async (payload, imageData, userId) => {
  if (!payload.content && !imageData.url) {
    throw new ApiError(400, "Give some content");
  }

  const isExistUser = await User.findById(userId);

  if (!isExistUser) {
    throw new ApiError(400, "User not found");
  }

  const newData = {};

  if (payload.content) {
    newData.content = payload.content;
  }

  newData.postCreator = userId;

  if (imageData.url) {
    newData.postImage = imageData;
  }

  const result = await Post.create(newData);

  return result;
};

const getAllPostService = async (filters, paginationOptions, userId) => {
  const { searchTerm, ...filtersData } = filters;

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const aggregationPipeline = [];
  const matchStage = {};

  if (searchTerm) {
    const searchConditions = postSearchableFields.map((field) => ({
      [field]: {
        $regex: searchTerm,
        $options: "i",
      },
    }));

    matchStage.$or = searchConditions;
  }

  if (Object.keys(filtersData).length) {
    matchStage.$and = Object.entries(filtersData).map(([field, value]) => {
      if (field === "postCreator") {
        return {
          [field]: new mongoose.Types.ObjectId(value),
        };
      }
      return {
        [field]: value,
      };
    });
  }

  if (Object.keys(matchStage).length > 0) {
    aggregationPipeline.push({ $match: matchStage });
  }

  // Sort Stage
  const sortConditions = {};

  // Dynamic sort needs fields to do sorting
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  // Add Sort Stage to Aggregation Pipeline
  if (Object.keys(sortConditions).length > 0) {
    aggregationPipeline.push({ $sort: sortConditions });
  }

  // Pagination Stage
  aggregationPipeline.push({ $skip: skip });
  aggregationPipeline.push({ $limit: limit });

  aggregationPipeline.push(
    {
      $lookup: {
        from: "users",
        localField: "postCreator",
        foreignField: "_id",
        as: "postCreator",
      },
    },
    {
      $unwind: "$postCreator",
    },
    {
      $project: {
        "postCreator.password": 0,
      },
    },
    {
      // find total comments two model(comments and reply comments)
      $lookup: {
        from: "comments",
        localField: "_id",
        foreignField: "postId",
        as: "comments",
      },
    },
    {
      $lookup: {
        from: "replycomments",
        localField: "_id",
        foreignField: "postId",
        as: "replycomments",
      },
    },
    {
      $addFields: {
        totalComments: {
          $add: [{ $size: "$comments" }, { $size: "$replycomments" }],
        },
      },
    },
    {
      $project: {
        comments: 0,
        replycomments: 0,
      },
    }
  );

  aggregationPipeline.push(
    {
      // read post or not
      $addFields: {
        isRead: {
          $cond: {
            if: {
              $in: [userId, "$readUser"],
            },
            then: true,
            else: false,
          },
        },
      },
    },
    {
      $project: {
        readUser: 0,
      },
    }
  );

  const result = await Post.aggregate(aggregationPipeline);
  const total = await Post.countDocuments(matchStage);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSinglePostService = async (id, userId) => {
  const isExistUser = await Post.findOne({
    _id: id,
    readUser: { $elemMatch: { $eq: userId } },
  });

  if (!isExistUser) {
    await Post.findByIdAndUpdate(
      id,
      {
        $push: {
          readUser: userId,
        },
      },
      {
        new: true,
      }
    );
  }

  const result = await Post.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(id),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "postCreator",
        foreignField: "_id",
        as: "postCreator",
      },
    },
    {
      $unwind: "$postCreator",
    },
    {
      $project: {
        "postCreator.password": 0,
      },
    },
  ]);

  return result[0];
};

const getMyPostService = async (userId) => {
  const result = await Post.find({ postCreator: userId }).sort({
    createdAt: -1,
  });
  return result;
};

const updateSinglePostService = async (id, payload, imageData, userId) => {
  const isExistPost = await Post.findById(id);

  if (!isExistPost) {
    throw new ApiError(400, "Post not found");
  }

  if (isExistPost.postCreator.toString() !== userId.toString()) {
    throw new ApiError(403, "You are not allowed to update this post");
  }

  const newData = {};

  if (payload.content) {
    newData.content = payload.content;
  }

  if (imageData.url) {
    newData.postImage = imageData;

    if (isExistPost.postImage?.public_id) {
      await deleteImageCloudinary(isExistPost.postImage?.public_id);
    }
  }

  const result = await Post.findByIdAndUpdate(id, newData, {
    new: true,
  });

  return result;
};

const deleteSinglePostService = async (id, userId) => {
  const isExistPost = await Post.findById(id);

  if (!isExistPost) {
    throw new ApiError(400, "Post not found");
  }

  if (isExistPost.postCreator.toString() !== userId.toString()) {
    throw new ApiError(403, "You are not allowed to update this post");
  }

  if (isExistPost.postImage?.public_id) {
    await deleteImageCloudinary(isExistPost.postImage?.public_id);
  }

  const result = await Post.findByIdAndDelete(id);

  return result;
};

// const readPostService = async (postId, userId) => {
//   const isExistPost = await Post.findById(postId);
//   if (!isExistPost) {
//     throw new ApiError(400, "Post not found");
//   }

//   const isExistUser = await User.findById(userId);
//   if (!isExistUser) {
//     throw new ApiError(400, "User not found");
//   }

//   const isRead = isExistPost.readUser.includes(userId);

//   if (isRead) {
//     throw new ApiError(400, "You already read this post");
//   }

//   const result = await Post.findByIdAndUpdate(
//     postId,
//     {
//       $push: {
//         readUser: userId,
//       },
//     },
//     {
//       new: true,
//     }
//   );

//   return result;
// };

// const getAllReadUnreadPostService = async (userId) => {
//   const result = await Post.aggregate([
//     {
//       $lookup: {
//         from: "users",
//         localField: "postCreator",
//         foreignField: "_id",
//         as: "postCreator",
//       },
//     },
//     {
//       $unwind: "$postCreator",
//     },
//     {
//       $project: {
//         "postCreator.password": 0,

//       },
//     },

//   ]);
// };

module.exports = {
  createPostService,
  getAllPostService,
  getSinglePostService,
  getMyPostService,
  updateSinglePostService,
  deleteSinglePostService,
  // readPostService,
};
