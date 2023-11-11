import Products from "../models/productModel.js";

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
