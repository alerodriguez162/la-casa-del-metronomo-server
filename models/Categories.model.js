// Iteration #1
const mongoose = require("mongoose");

const categoriesSchema = mongoose.Schema(
  {
    label: {
      type: String,
      unique: true,
      required: true,
    },
    products: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        count: Number,
      },
    ],
  },
  { timestamps: true }
);

const Categories = mongoose.model("Categories", categoriesSchema);

module.exports = Categories;
