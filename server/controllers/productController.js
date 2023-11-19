import Products from "../models/productModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import catchErrors from "../middleware/catchAsyncErrors.js";
import ApiFeatures from "../utils/apifeatures.js";

// Create new product
export const createProduct = catchErrors(async (req, res) => {
  req.body.user = req.user.id;
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
  const resPerPage = 5;
  const productCount = await Products.countDocuments();
  const apiFeature = new ApiFeatures(Products.find(), req.query)
    .search()
    .filter()
    .pagination(resPerPage);
  const products = await apiFeature.query;
  if (!products) {
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
    // productCount,
  });
});

// Create new review or update the review
export const createProductReview = catchErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  const review = {
    user: req.user.id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };
  const product = await Products.findById(productId);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  const isReviewed = product.reviews.find(
    (r) => r.user.toString() === req.user.id.toString()
  );
  if (isReviewed && isReviewed.length > 0) {
    product.reviews.forEach((review) => {
      if (review.user.toString() === req.user.id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }
  let avg = 0;
  product.reviews.forEach((review) => {
    avg += review.rating;
  });
  product.ratings = avg / product.reviews.length;
  await product.save({ validateBeforeSave: false });
  return res.status(200).send({
    success: true,
    message: "Review added successfully",
  });
});

//get all reviews of a product
export const getProductReviews = catchErrors(async (req, res, next) => {
  const product = await Products.findById(req.query.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  return res.status(200).send({
    success: true,
    message: "Reviews retrieved successfully",
    reviews: product.reviews,
  });
});

//Delete product review
export const deleteReview = catchErrors(async (req, res, next) => {
  const product = await Products.findById(req.query.productId);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  const reviews = product.reviews.filter(
    (review) => review._id.toString() !== req.query.id.toString()
  );
  let avg = 0;
  reviews.forEach((review) => {
    avg += review.rating;
  });
  product.ratings = avg / reviews.length;
  product.reviews = reviews;
  product.numOfReviews = reviews.length;
  await Products.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings: avg / reviews.length,
      numOfReviews: reviews.length,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  return res.status(200).send({
    success: true,
    message: "Review deleted successfully",
  });
});
