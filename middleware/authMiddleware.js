// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  if (process.env.BYPASS_AUTH === 'true') {
    console.log("Bypassing JWT Authentication");
    req.userId = "675d5327bb393373e628eae3";
    return next(); // Skip token verification
  }
  let token = req.headers["authorization"];
  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }
  token = token.replace("Bearer ", "");
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Failed to authenticate token" });
    }
    req.userId = decoded._id;
    next();
  });
};
