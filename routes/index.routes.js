const router = require("express").Router();
const homeController = require("./../controllers/home.controller");

/* GET home page */
router.get("/", homeController.getHomePage);

module.exports = router;
