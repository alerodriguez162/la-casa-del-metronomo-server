const express = require("express");
const cors = require("cors");
const logger = require("morgan");

module.exports = (app) => {
  app.use(logger("dev"));
  app.use(cors());
  app.use(express.json({ extended: true }));
};
