import Products from "../models/productModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import catchErrors from "../middleware/catchAsyncErrors.js";

// Create new product
export const createProduct = catchErrors(async (req, res) => {
  const product = await Products.create(req.body);
  if (!product) {
    return next(new ErrorHandler("Issue in creating Product", 404));
  }
  return res.status(201).send({
    success: true,
    message: "Product created successfully",
    data: product,
  });
});

// Get all products

export const getAllProducts = catchErrors(async (req, res) => {
  const products = await Products.find({});
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  return res.status(200).send({
    success: true,
    message: "Products retrieved successfully",
    data: products,
  });
});

// update single product
export const updateProduct = catchErrors(async (req, res) => {
  let product = await Products.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Issue In updating product", 404));
  }
  product = await Products.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  return res.status(200).send({
    success: true,
    message: "Product updated successfully",
    product,
  });
});

//Delete product
export const deleteProduct = catchErrors(async (req, res, next) => {
  let product = await Products.findByIdAndDelete(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Unable to delete Product", 404));
  }
  return res.status(200).send({
    success: true,
    message: "Product deleted successfully",
  });
});

// Get Products Details
export const getProductDetails = catchErrors(async (req, res, next) => {
  const product = await Products.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product Details not found", 404));
  }
  return res.status(200).send({
    success: true,
    message: "Single Product Detail Get successfully",
    product,
  });
});
