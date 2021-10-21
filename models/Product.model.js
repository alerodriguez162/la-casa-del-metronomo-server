// Iteration #1
const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    featured: Boolean,
    title: { type: String, unique: true },
    price: Number,
    description: String,
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Categories" }],
    image: [String],
    specifications: [
      {
        specificationName: String,
        specificationList: [String],
      },
    ],
    rating: {
      rate: {
        type: Number,
        default: 0,
      },
      count: {
        type: Number,
        default: 0,
      },
    },
    stock: Number,
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
