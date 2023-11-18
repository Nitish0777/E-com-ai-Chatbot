import userModel from "../models/userModel.js";

// Create and send token and save in the cookie
const sendToken = (user, statusCode, res) => {
  const token = user.getJwtToken();
  // Options for cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000 // 30 days
    ),
    httpOnly: true,
  };
  res.status(statusCode).cookie("token", token, options).send({
    success: true,
    token,
    user,
  });
};

export default sendToken;
