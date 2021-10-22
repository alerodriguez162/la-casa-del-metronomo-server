const router = require("express").Router();
const authorization = require("../middlewares/authorization");
const categoriesController = require("../controllers/categories.controller");

router.post("/create", authorization, categoriesController.createCategory);

router.delete("/delete/:categoryId", authorization, categoriesController.deleteCategory);

router.get("/all", categoriesController.allCategories);

module.exports = router;
