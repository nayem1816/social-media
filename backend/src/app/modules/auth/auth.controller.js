const config = require("../../../config/config");
const sendResponse = require("../../../shared/sendResponse");
const AuthService = require("./auth.service");
const emailjs = require("@emailjs/nodejs");

const login = async (req, res, next) => {
  try {
    const result = await AuthService.loginService(req.body);
    const { refreshToken, accessToken, user } = result;

    // set refresh token into cookie
    const cookieOptions = {
      secure: config.env === "production",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    };

    res.cookie("refreshToken", refreshToken, cookieOptions);
    res.cookie("accessToken", accessToken, cookieOptions);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User logged in successfully!",
      data: {
        user,
        accessToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const result = await AuthService.resetPasswordService(email);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: result.message,
    });
  } catch (error) {
    next(error);
  }
};

const resetPasswordByUserIdAndToken = async (req, res, next) => {
  try {
    const { userId, token } = req.params;
    const { password } = req.body;

    const result = await AuthService.resetPasswordByUserIdAndTokenService(
      userId,
      token,
      password
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  resetPassword,
  resetPasswordByUserIdAndToken,
};
