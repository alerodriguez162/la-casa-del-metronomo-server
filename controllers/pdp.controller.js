const Categories = require("../models/Categories.model");
const Product = require("../models/Product.model");

const getProductById = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const newProduct = await Product.create({ ...req.body });
    req.body.categories.forEach(async (category) => {
      await Categories.findByIdAndUpdate(
        category,
        {
          $push: {
            products: {
              product: newProduct._id,
              quantity: 1,
            },
          },
        },
        { new: true }
      );
    });
    res.status(201).json({
      newProduct,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProductById = async (req, res) => {
  try {
    await Product.findByIdAndRemove(req.params.productId);
    res.status(200).json({ message: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const editProductById = async (req, res) => {};

module.exports = {
  getProductById,
  createProduct,
  deleteProductById,
  editProductById,
};
