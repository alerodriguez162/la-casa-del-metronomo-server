// Iteration #1
const mongoose = require("mongoose");

const cartSchema = mongoose.Schema(
  {
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: Number,
      },
    ],
    discount: String,
    firstName: String,
    lastName: String,
    email: String,
    address: String,
    adress2: String,
    state: String,
    zip: String,
    sameAddressToBilling: String,
    status: Number,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
