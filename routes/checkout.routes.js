const router = require("express").Router();
const checkoutController = require("../controllers/checkout.controller");
const authorization = require("../middlewares/authorization");

// router.get("/", routeGuards.isLoggedIn, checkoutController.createCheckout);
router.post("/", authorization, checkoutController.submitCheckout);
module.exports = router;
