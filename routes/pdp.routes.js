const router = require("express").Router();
const pdpController = require("../controllers/pdp.controller");
const authorization = require("../middlewares/authorization");

router.get("/:productId", pdpController.getProductById);

router.post("/create", authorization, pdpController.createProduct);

router.delete("/delete/:productId", authorization, pdpController.deleteProductById);

router.post("/edit/:productId", authorization, pdpController.editProductById);

module.exports = router;
