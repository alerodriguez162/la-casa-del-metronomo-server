const express = require("express");
const app = express();

require("dotenv/config");
require("./config")(app);
require("./db");

const index = require("./routes/index.routes");
app.use("/", index);

const pdp = require("./routes/pdp.routes");
app.use("/pdp", pdp);

const plp = require("./routes/plp.routes");
app.use("/plp", plp);

const auth = require("./routes/auth.routes");
app.use("/auth", auth);

const cart = require("./routes/cart.routes");
app.use("/cart", cart);

const checkout = require("./routes/checkout.routes");
app.use("/checkout", checkout);

const user = require("./routes/user.routes");
app.use("/user", user);

module.exports = app;
