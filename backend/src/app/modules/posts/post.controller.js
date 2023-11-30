const paginationFields = require("../../../constants/pagination");
const pick = require("../../../shared/pick");
const sendResponse = require("../../../shared/sendResponse");
const { postFilterableFields } = require("./post.constant");
const PostService = require("./post.service");

const createPost = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const file = req.file;

    let postImage = {};

    if (file?.path) {
      postImage = {
        url: file?.path,
        public_id: file?.filename,
      };
    }

    const result = await PostService.createPostService(
      req.body,
      postImage,
      userId
    );

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Post created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllPost = async (req, res, next) => {
  try {
    const filters = pick(req.query, postFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await PostService.getAllPostService(
      filters,
      paginationOptions
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "All post",
      meta: result.meta,
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
};

const getSinglePost = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await PostService.getSinglePostService(id);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Single post",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getMyPosts = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const result = await PostService.getMyPostService(userId);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "My posts",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createPost,
  getAllPost,
  getSinglePost,
  getMyPosts,
};
