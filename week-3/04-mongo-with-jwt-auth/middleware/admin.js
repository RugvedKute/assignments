const { Admin } = require("../db");

// Middleware for handling auth
async function adminMiddleware(req, res, next) {
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
  username = req.headers.username;
  password = req.headers.password;
  try {
    const isAdmin = await Admin.findOne({ username: username });

    if (isAdmin) {
      next();
    } else {
      return res.status(404).json({ msg: "No Admin found" });
    }
  } catch(error) {
    res.status(500).json({
      msg: "Internal Server Error",
    });
  }
}

module.exports = adminMiddleware;
