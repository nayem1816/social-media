const sendResponse = require("../../../shared/sendResponse");
const CommentService = require("./comment.service");

const createComment = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const file = req.file;

    let commentImage = {};

    if (file?.path) {
      commentImage = {
        url: file?.path,
        public_id: file?.filename,
      };
    }

    const result = await CommentService.createCommentService(
      req.body,
      commentImage,
      userId
    );

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Comment created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllCommentByPostId = async (req, res, next) => {
  try {
    const result = await CommentService.getAllCommentByPostIdService(
      req.params.postId
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Get all comment successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateSingleComment = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const file = req.file;

    let commentImage = {};

    if (file?.path) {
      commentImage = {
        url: file?.path,
        public_id: file?.filename,
      };
    }

    const result = await CommentService.updateSingleCommentService(
      req.params.commentId,
      req.body,
      commentImage,
      userId
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Comment updated successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteSingleComment = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const result = await CommentService.deleteSingleCommentService(
      req.params.commentId,
      userId
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Comment deleted successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createComment,
  getAllCommentByPostId,
  updateSingleComment,
  deleteSingleComment,
};
