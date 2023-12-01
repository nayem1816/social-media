const User = require("../User/user.model");
const bcrypt = require("bcrypt");
const jwtHelpers = require("../../../helpers/jwtHelpers");
const ApiError = require("../../../errors/apiError");
const config = require("../../../config/config");
const Token = require("../token/token.model");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const loginService = async (payload) => {
  const { email, password } = payload;

  const isExistUser = await User.findOne({
    email,
  });

  if (!isExistUser) {
    throw new ApiError(400, "User does not exist");
  }

  const { _id, role } = isExistUser;

  const isMatchPassword = async () => {
    return await bcrypt.compare(password, isExistUser.password);
  };

  if (!isMatchPassword) {
    throw new ApiError(400, "Invalid credentials");
  }

  const accessToken = jwtHelpers.createToken(
    { _id, email, role },
    config.jwt.secret,
    config.jwt.expires_in
  );

  const refreshToken = jwtHelpers.createToken(
    { _id, email, role },
    config.jwt.refresh_secret,
    config.jwt.refresh_expires_in
  );

  return {
    user: isExistUser,
    accessToken,
    refreshToken,
  };
};

const resetPasswordService = async (email) => {
  const isExistUser = await User.findOne({
    email: email,
  });

  if (!isExistUser) {
    throw new ApiError(400, "User does not exist");
  }

  let token = await Token.findOne({ userId: isExistUser._id });

  if (!token) {
    token = await new Token({
      userId: isExistUser._id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();
  }

  const link = `http://localhost:3000/reset-password/${isExistUser._id}/${token.token}`;

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "nathanael77@ethereal.email",
      pass: "6ywNf5hd1tdaUTcpMS",
    },
  });

  const mailOptions = {
    from: "nathanael77@ethereal.email",
    to: email,
    subject: "Reset Password",
    text: `Hello ${isExistUser.fullName}, reset your password using the following link: ${link}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });

  return {
    message: "Reset password link sent successfully",
  };
};

module.exports = {
  loginService,
  resetPasswordService,
};
