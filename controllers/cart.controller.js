const Product = require("../models/Product.model");
const Cart = require("../models/Cart.model");

const calculateAmount = (items) => {
  let amount = items.reduce((acc, item) => {
    return acc + item.product.price * item.quantity;
  }, 0);
  return amount;
};

const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const currentUser = req.user;

    const findCart = await Cart.findOne({ user: currentUser.id });
    let updatedObject = {};
    let filter = {};
    if (findCart.products && findCart.products.length && findCart.products.some((e) => e.product?.toString() === productId)) {
      updatedObject = {
        $set: {
          "products.$.quantity": quantity,
        },
      };
      filter = { user: currentUser.id, "products.product": productId };
    } else {
      updatedObject = {
        $push: {
          products: {
            product: productId,
            quantity: quantity,
          },
        },
      };
      filter = { user: currentUser.id };
    }
    let updatedCart = await Cart.findOneAndUpdate(filter, updatedObject, { new: true });
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;

    const currentUser = req.user;

    let updatedCart = await Cart.findOneAndUpdate(
      { user: currentUser.id },
      {
        $pull: {
          products: {
            product: productId,
          },
        },
      },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getCart = async (req, res) => {
  try {
    const currentUser = req.user;

    const findCart = await Cart.findOne({ user: currentUser.id });
    if (!findCart) {
      await Cart.create({
        user: currentUser.id,
        status: 0,
        products: [],
      });
    }
    const cartFind = await Cart.findOne({ user: currentUser.id }).populate("products.product");

    res.status(200).json({
      totalProducts: cartFind.products.length,
      status: cartFind.status,
      products: cartFind.products.length > 0 ? cartFind.products : [],
      total: calculateAmount(cartFind.products),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const clearCart = async (req, res) => {
  try {
    const currentUser = req.user;

    let updatedCart = await Cart.findOneAndUpdate(
      { user: currentUser.id },
      {
        $set: {
          products: [],
        },
      },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addToCart,
  removeFromCart,
  getCart,
  clearCart,
};
