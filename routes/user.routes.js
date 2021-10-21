const router = require("express").Router();
const { check } = require("express-validator");
const usersController = require("../controllers/user.controller");
const authorization = require("../middlewares/authorization");

router.post(
  "/create",
  [
    check("firstName", "El nombre es obligatorio.").not().isEmpty(),
    check("lastName", "El apellido es obligatorio.").not().isEmpty(),
    check("email", "Agrega un email válido").isEmail(),
    check("password", "El password debe ser mínimo de 6 caracteres").isLength({ min: 6 }),
  ],
  usersController.createUser
);

router.post("/edit", authorization, usersController.editUser);

router.delete("/delete/:email", authorization, usersController.deleteUser);

router.get("/", authorization, usersController.getUser);

router.get("/all", authorization, usersController.getAllUsers);

module.exports = router;
