import express from "express";
import {
  loginUser,
  registerUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getSingleUser,
  getAllUsers,
  updateUserRole,
  deleteUser,
} from "../controllers/userController.js";
import { authorizeRoles, isAuthenticatedUser } from "../middleware/auth.js";

const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/password/forgot").post(forgotPassword);

router.route("/password/reset/:token").put(resetPassword);

router.route("/logout").get(logoutUser);

router.route("/me").get(isAuthenticatedUser, getUserDetails);

router.route("/password/update").put(isAuthenticatedUser, updatePassword);

router.route("/me/update").put(isAuthenticatedUser, updateProfile);

router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllUsers);

router
  .route("/admin/users/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUser)
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateUserRole)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);

export default router;

// 3:37:54 ------- Start
// 4:01:20 ------- End
