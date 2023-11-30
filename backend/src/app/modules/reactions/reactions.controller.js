const sendResponse = require("../../../shared/sendResponse");
const ReactionsService = require("./reactions.service");

const createReact = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const result = await ReactionsService.createReactService(req.body, userId);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
};

const getAllReactByPostId = async (req, res, next) => {
  try {
    const postId = req.params.postId;

    const result = await ReactionsService.getAllReactByPostIdService(postId);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Get all react by post id successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createReact,
  getAllReactByPostId,
};
