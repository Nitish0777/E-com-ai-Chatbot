import ErrorHandler from "../utils/errorHandler.js";
import catchErrors from "../middleware/catchAsyncErrors.js";
import User from "../models/userModel.js";
import sendToken from "../utils/jwtToken.js";
import { sendEmail } from "../utils/sendEmail.js";

//Register a user
export const registerUser = catchErrors(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "avatars/kwqkqj8fzqjzqz6x9gqo",
      url: "https://res.cloudinary.com/ds0qwwyqo/image/upload/v1625189216/avatars/kwqkqj8fzqjzqz6x9gqo.jpg",
    },
  });
  if (!user) {
    return next(new ErrorHandler("Issue in creating User", 404));
  }
  sendToken(user, 201, res);
});

export const loginUser = catchErrors(async (req, res, next) => {
  const { email, password } = req.body;
  // Check if email and password is entered by user
  if (!email || !password) {
    return next(new ErrorHandler("Please enter email & password", 400));
  }
  // Finding user in database
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }
  // Check if password is correct or not
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }
  sendToken(user, 200, res);
});

export const logoutUser = catchErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

//forgot password
export const forgotPassword = catchErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  // Check if user exists
  if (!user) {
    return next(new ErrorHandler("User not found with this email", 404));
  }
  // Get re set token
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  // Create reset password url
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}`;

  const message = `Your password reset token is as follow:\n\n${resetUrl}\n\nIf you have not requested this email, then ignore it.`;

  try {
    console.log("email", user.email);
    await sendEmail({
      email: user.email,
      subject: "ShopIT Password Recovery",
      message,
    });
    res.status(200).json({
      success: true,
      message: `Email sent to: ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500));
  }
});

// Reset password   =>   /api/v1/password/reset/:token
export const resetPassword = catchErrors(async (req, res, next) => {
  // Hash URL token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(
      new ErrorHandler(
        "Password reset token is invalid or has been expired",
        400
      )
    );
  }
  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not match", 400));
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not match", 400));
  }
  // Setup the new password
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();
  sendToken(user, 200, res);
});
