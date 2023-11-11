import Products from "../models/productModel.js";

// Create new product
export const createProduct = async (req, res) => {
  try {
    const product = await Products.create(req.body);
    if (!product) {
      return res.status(400).send({
        success: false,
        message: "Product not created",
      });
    }
    return res.status(201).send({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

// Get all products

export const getAllProducts = async (req, res) => {
  const products = await Products.find({});
  if (!products) {
    return res.status(404).send({
      success: false,
      message: "Products not found",
    });
  }
  return res.status(200).send({
    success: true,
    message: "Products retrieved successfully",
    data: products,
  });
};

// update single product
export const updateProduct = async (req, res) => {
  let product = await Products.findById(req.params.id);
  if (!product) {
    return res.status(404).send({
      success: false,
      message: "Product not found",
    });
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
};

//Delete product
export const deleteProduct = async (req, res) => {
  try {
    let product = await Products.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).send({
        success: false,
        message: "Product not found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

// Get Products Details
export const getProductDetails = async (req, res) => {
  try {
    const product = await Products.findById(req.params.id);
    if (!product) {
      return res.status(404).send({
        success: false,
        message: "Product not found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Single Product Detail Get successfully",
      product,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};
