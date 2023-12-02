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

  console.log("isExistUser", isExistUser);

  if (!isExistUser) {
    throw new ApiError(400, "User does not exist");
  }

  const { _id, role } = isExistUser;

  const isMatchPassword = await bcrypt.compare(password, isExistUser.password);

  console.log("isMatchPassword", isMatchPassword);

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

  const link = `${config.frontend_link}/reset-password/${isExistUser._id}/${token.token}`;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: config.nodemailer.user,
      pass: config.nodemailer.pass,
    },
  });

  const mailOptions = {
    from: config.nodemailer.user,
    to: email,
    subject: "Reset Password",
    text: `Hello ${isExistUser.fullName}, reset your password using the following link: ${link}`,
  };

  // transporter.sendMail(mailOptions, (error, info) => {
  //   if (error) {
  //     console.log("Error sending email:", error);
  //   } else {
  //     console.log("Email sent:", info.response);
  //   }
  // });

  const sendMailPromise = () => {
    return new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          reject(error);
        } else {
          resolve(info);
        }
      });
    });
  };

  try {
    const info = await sendMailPromise();
    console.log("Email sent:", info.response);
    return {
      message: "Reset password link sent successfully",
    };
  } catch (error) {
    console.log("Error sending email:", error);
    throw new Error("Failed to send email");
  }

  // return {
  //   message: "Reset password link sent successfully",
  // };
};

const resetPasswordByUserIdAndTokenService = async (
  userId,
  token,
  password
) => {
  const isExistValidToken = await Token.findOne({
    userId,
    token,
  });

  if (!isExistValidToken) {
    throw new ApiError(400, "Invalid token");
  }

  const hashedPassword = await bcrypt.hash(
    password,
    Number(config.bcrypt_salt_rounds)
  );

  const result = await User.findByIdAndUpdate(
    userId,
    {
      password: hashedPassword,
    },
    {
      new: true,
    }
  );

  await Token.findByIdAndDelete(isExistValidToken._id);

  return {
    message: "Password reset successfully",
    data: result,
  };
};

module.exports = {
  loginService,
  resetPasswordService,
  resetPasswordByUserIdAndTokenService,
};
