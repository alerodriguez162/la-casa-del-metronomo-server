// Iteration #1
const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    featured: Boolean,
    title: String,
    price: Number,
    description: String,
    categories: [String],
    image: [String],
    specifications: [
      {
        specificationName: String,
        specificationList: [String],
      },
    ],
    rating: {
      rate: Number,
      count: Number,
    },
    stock: Number,
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
