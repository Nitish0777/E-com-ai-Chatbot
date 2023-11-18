import ErrorHandler from "../utils/errorHandler.js";
import catchErrors from "../middleware/catchAsyncErrors.js";
import User from "../models/userModel.js";

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
  const token = user.getJwtToken();
  return res.status(201).send({
    success: true,
    token,
  });
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
  const token = user.getJwtToken();
  return res.status(200).send({
    success: true,
    token,
  });
});
