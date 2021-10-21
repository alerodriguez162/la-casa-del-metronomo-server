const User = require("../models/User.model");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const getUser = async (req, res) => {
  try {
    const userData = await User.findById(req.user.id).select("-hashedPassword");
    return res.json({
      user: userData,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createUser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: errors.array(),
    });
  }

  try {
    const { firstName, lastName, email, password, picture } = req.body;

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const newUser = await User.create({
      name: firstName,
      lastName: lastName,
      email: email,
      passwordHash: hashedPassword,
      roles: "customer",
      picture: picture,
    });

    const payload = {
      user: {
        id: newUser._id,
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

const editUser = async (req, res) => {
  try {
    const { email } = req.body;
    const userFind = await User.findOneAndUpdate({ email: email }, req.body, { new: true });
    return res.status(200).json({
      userFind,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { email } = req.params;
    const userFind = await User.findOneAndRemove({ email: email });
    return res.status(200).json({
      userFind,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllUsers = async (req, res) => {
  const users = await User.find({});
  res.status(200).json({ users });
};
// const postForgotPassword = (req, res) => {};

module.exports = {
  getUser,
  editUser,
  deleteUser,
  createUser,
  getAllUsers,
};
