const { User } = require("../db");

function userMiddleware(req, res, next) {

    username = req.headers.username;
    password = req.headers.password;

    User.findOne({
        username: username,
        password: password,
    })
    .then((isUser) => {
        if (isUser) {
            next();
        } else  {
            res.status(404).json({
                msg: 'User not found'
            })
        }
    })
    .catch((err) => {
        // Handle any errors that occur during the database query
        console.error(err);
        res.status(500).json({
          msg: "Internal Server Error",
        });
      });

    

    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
}

module.exports = userMiddleware;