const Product = require("../models/Product.model");

const getProducts = async (req, res, next) => {
  try {
    const querys = req.query;

    if (!querys) {
      const products = await Product.find({});
      res.status(200).json({ products: products });
    } else {
      const products = await Product.find({ title: { $regex: querys.search || "", $options: "i" } });
      res.status(200).json({ products: products });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = {
  getProducts,
};
