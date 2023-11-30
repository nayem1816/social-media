const sendResponse = require("../../../shared/sendResponse");
const ReplyCommentService = require("./reply_comment.service");

const createReplyComment = async (req, res, next) => {
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

    const result = await ReplyCommentService.createReplyCommentService(
      req.body,
      commentImage,
      userId
    );

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Comment reply successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllReplyCommentByCommentId = async (req, res, next) => {
  try {
    const result =
      await ReplyCommentService.getAllReplyCommentByCommentIdService(
        req.params.commentId
      );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Get all comment reply successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateSingleReplyComment = async (req, res, next) => {
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

    const result = await ReplyCommentService.updateSingleReplyCommentService(
      req.params.replyCommentId,
      req.body,
      commentImage,
      userId
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Comment Reply updated successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteSingleReplyComment = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const result = await ReplyCommentService.deleteSingleReplyCommentService(
      req.params.replyCommentId,
      userId
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Comment reply deleted successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createReplyComment,
  getAllReplyCommentByCommentId,
  updateSingleReplyComment,
  deleteSingleReplyComment,
};
