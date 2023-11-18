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
