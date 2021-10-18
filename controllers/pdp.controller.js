const Product = require("../models/Product.model");

const getProductById = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const createProduct = async (req, res) => {};

const deleteProductById = async (req, res) => {};

const editProductById = async (req, res) => {};

module.exports = {
  getProductById,
  createProduct,
  deleteProductById,
  editProductById,
};
