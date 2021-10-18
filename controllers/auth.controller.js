const User = require("../models/User.model");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const postLogin = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: errors.array(),
    });
  }

  const { email, password } = req.body;

  try {
    const foundUser = await User.findOne({ email });

    if (!foundUser) throw new Error("El usuario o la contraseña son erróneas. Intente nuevamente");

    const passwordMath = await bcryptjs.compareSync(password, foundUser.passwordHash);

    if (!passwordMath) throw new Error("La contraseña es incorrecta. Intente nuevamente");

    const payload = {
      user: {
        id: foundUser._id,
      },
    };
    jwt.sign(
      payload,
      process.env.SECRET,
      {
        expiresIn: 360000,
      },
      (error, token) => {
        if (error) {
          return res.status(401).json({
            message: error.message,
          });
        }

        return res.status(200).json({
          token,
        });
      }
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  postLogin,
};
