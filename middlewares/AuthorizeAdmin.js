// Middleware to verify JWT
const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(token, process.env.JWT_TOKEN_SECRET_KEY, (err, admin) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token" });
    }

    req.admin = admin;
    next();
  });
};

module.exports = { authenticateToken };
