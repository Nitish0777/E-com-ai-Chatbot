import express from "express";
import { isAuthenticatedUser, authorizeRoles } from "../middleware/auth.js";
import {
  getSingleOrder,
  myOrders,
  newOrder,
} from "../controllers/orderController.js";

const router = express.Router();

router.route("/order/new").post(isAuthenticatedUser, newOrder);

router
  .route("/order/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getSingleOrder);

router.route("/orders/me").get(isAuthenticatedUser, myOrders);

export default router;
