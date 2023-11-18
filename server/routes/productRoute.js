import express from "express";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
} from "../controllers/productController.js";
import { isAuthenticatedUser } from "../middleware/auth.js";

const router = express.Router();

router.route("/products").get(getAllProducts);

router.route("/products/new").post(isAuthenticatedUser, createProduct);

router
  .put(isAuthenticatedUser, updateProduct)
  .route("/products/:id")
  .delete(isAuthenticatedUser, deleteProduct)
  .get(getProductDetails);

export default router;
