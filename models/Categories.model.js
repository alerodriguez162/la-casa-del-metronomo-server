// Iteration #1
const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    label: String,
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
