const stripe = require("stripe")(process.env.STRIPE_SECRET);

const Cart = require("../models/Cart.model");
const Summary = require("../models/Summary.model");
const User = require("../models/User.model");

const calculateAmount = (items) => {
  let amount = items.reduce((acc, item) => {
    return acc + item.product.price * item.quantity;
  }, 0);
  return amount;
};

// const createCheckout = async (req, res) => {
//   try {
//     const currentUser = req.user;

//     const currentCart = await Cart.findOne({ user: currentUser._id }).populate("products.product");

//     res.status(200).json({
//       products: currentCart.products,
//       total: calculateAmount(currentCart.products),
//     });
//   } catch (error) {
//         res.status(500).json({ message: error.message });

//   }
// };

const summaries = async (req, res) => {
  try {
    const currentUser = req.user;
    const summaryFind = await Summary.find({ user: currentUser.id }).populate("summary.products.product");

    res.status(200).json({
      orders: summaryFind,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const submitCheckout = async (req, res) => {
  try {
    const { firstName, lastName, email, address, address2, state, zip, sameAddress, cardName, stripeToken } = req.body;
    // const token = req.body.stripeToken; // Using Express

    const currentUser = req.user;

    const currentCart = await Cart.findOne({ user: currentUser.id }).populate("products.product");
    const charge = await stripe.charges.create({
      amount: calculateAmount(currentCart.products) * 100,
      currency: "mxn",
      description: "Example charge",
      source: stripeToken,
      receipt_email: email,
    });
    let statusCart = 0;
    if (charge.status === "succeeded") statusCart = 2;
    else console.log(charge.status);
    let newCart = await Cart.findOneAndUpdate(
      { user: currentUser.id },
      {
        firstName: firstName,
        lastName: lastName,
        email: email,
        address: address,
        address2: address2,
        state: state,
        status: statusCart,
        zip: zip,
        sameAddress: sameAddress,
        cardName: cardName,
        stripeToken: stripeToken,
      },
      {
        new: true,
      }
    ).populate("products.product");
    let date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let newDate = "";
    if (month < 10) {
      newDate = `${day}-0${month}-${year}`;
    } else {
      newDate = `${day}-${month}-${year}`;
    }

    await Summary.create({
      summary: {
        date: newDate,
        charge: charge,
        cart: newCart,
        products: newCart.products,
        total: calculateAmount(currentCart.products),
      },
      user: currentUser.id,
    });

    res.status(200).json({
      date: newDate,
      charge: charge,
      cart: newCart,
      products: newCart.products,
      total: calculateAmount(currentCart.products),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  // createCheckout,
  summaries,
  submitCheckout,
};
