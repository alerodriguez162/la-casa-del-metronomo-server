const Product = require("../models/Product.model");

const getHomePage = async (req, res) => {
  try {
    const productsFeatured = await Product.find({ featured: true });
    res.status(200).json({
      featuredProducts: productsFeatured,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getHomePage,
};
