const router = require("express").Router();
const plpController = require("../controllers/plp.controller");

router.get("/", plpController.getProducts);

module.exports = router;
