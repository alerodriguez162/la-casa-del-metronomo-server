const Product = require("../models/Product.model");

const getProducts = async (req, res, next) => {
  try {
    const { categories, featured, search } = req.body;

    if (!search) {
      if (categories && categories.length) {
        const products = await Product.find({ $or: categories });
        res.status(200).json({ products: products });
        return;
      }
      if (featured) {
        const products = await Product.find({ featured: true });
        res.status(200).json({ products: products });
        return;
      }
      const products = await Product.find({}).populate("categories");
      res.status(200).json({ products: products });
      return;
    } else {
      const products = await Product.find({ title: { $regex: search || "", $options: "i" } });
      res.status(200).json({ products: products });
      return;
    }

    // const products = await Product.find({ categories: "6170d954df171a25088f5ca3" });
    // res.status(200).json({ products: products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
};
