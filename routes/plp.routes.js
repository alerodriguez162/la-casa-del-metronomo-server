const router = require("express").Router();
const plpController = require("../controllers/plp.controller");

router.post("/", plpController.getProducts);

module.exports = router;
