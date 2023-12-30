const { User } = require("../db");

async function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    username = req.headers.username;
    password = req.headers.password;
    try {
      const isAdmin = await User.findOne({ username: username });
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

module.exports = userMiddleware;