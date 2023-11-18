import express from "express";
import {
  loginUser,
  registerUser,
  logoutUser,
  forgotPassword,
} from "../controllers/userController.js";

const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/password/forgot").post(forgotPassword);

router.route("/logout").get(logoutUser);

export default router;
