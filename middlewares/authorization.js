const jwt = require("jsonwebtoken");

const checkToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({
      message: "Please provide a token",
    });
  }

  try {
    const token = authHeader.split(" ")[1];
    const tokenDecode = jwt.verify(token, process.env.SECRET);

    req.user = tokenDecode.user;

    next();
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = checkToken;
