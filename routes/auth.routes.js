const router = require("express").Router();
const { check } = require("express-validator");
const authController = require("../controllers/auth.controller");
const authorization = require("../middlewares/authorization");

router.post("/login", [check("email", "Ingrese un email válido").isEmail(), check("password", "Ingrese una contraseña válida.").not().isEmpty()], authController.postLogin);

module.exports = router;
