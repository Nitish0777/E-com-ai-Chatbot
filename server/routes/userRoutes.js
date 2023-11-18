import express from "express";
import {
  loginUser,
  registerUser,
  logoutUser,
  forgotPassword,
  resetPassword,
} from "../controllers/userController.js";

const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/password/forgot").post(forgotPassword);

router.route("/password/reset/:token").put(resetPassword);

router.route("/logout").get(logoutUser);

export default router;
