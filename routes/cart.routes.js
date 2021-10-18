const router = require("express").Router();
const CartController = require("../controllers/cart.controller");
const authorization = require("../middlewares/authorization");

router.get("/", authorization, CartController.getCart);
router.post("/add", authorization, CartController.addToCart);
router.post("/remove", authorization, CartController.removeFromCart);
router.delete("/delete", authorization, CartController.clearCart);
module.exports = router;
