import express from "express";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
} from "../controllers/productController.js";

const router = express.Router();

router.route("/products").get(getAllProducts);

router.route("/products/new").post(createProduct);

router.route("/products/:id").put(updateProduct);

router.route("/products/:id").delete(deleteProduct).get(getProductDetails);

export default router;
