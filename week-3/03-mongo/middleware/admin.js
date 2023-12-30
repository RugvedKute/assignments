const { Admin } = require("../db");

// Middleware for handling auth
function adminMiddleware(req, res, next) {
  // Extract username and password from headers
  const username = req.headers.username;
  const password = req.headers.password;

  // Find admin in the database based on provided credentials
  Admin.findOne({
    username: username,
    password: password,
  })
    .then((admin) => {
      // If admin is found, proceed to the next middleware or route
      if (admin) {
        next();
      } else {
        // If admin is not found, send a response indicating the user does not exist
        res.json({
          msg: "User does not exist",
        });
      }
    })
    .catch((err) => {
      // Handle any errors that occur during the database query
      console.error(err);
      res.status(500).json({
        msg: "Internal Server Error",
      });
    });
}

module.exports = adminMiddleware;

module.exports = adminMiddleware;
