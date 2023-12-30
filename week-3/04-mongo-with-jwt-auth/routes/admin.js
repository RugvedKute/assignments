const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const jwt = require("jsonwebtoken");
const { Admin, Course } = require("../db");
const jwtPassword = "MythriCutie@69";
const { v4: uuidv4 } = require('uuid');


// Admin Routes
router.post("/signup", async (req, res) => {
  username = req.body.username;
  password = req.body.password;

  try {
    await Admin.create({
      username: username,
      password: password,
    });

    res.status(200).json({
      message: "Admin created successfully",
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: "Interval Server Error",
    });
  }
});

router.post("/signin", async (req, res) => {
  username = req.body.username;
  password = req.body.password;

  try {
    const data = {
      username: username,
      password: password,
    };
    const token = jwt.sign(data, jwtPassword);

    res.status(200).json({
      token: token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Interval Server Error",
    });
  }
});

router.post("/courses", adminMiddleware, async (req, res) => {
    try {
      const token = req.headers.authorization; // Corrected header name
  
      if (!token) {
        return res.status(400).json({
          message: "Missing json web token",
        });
      }
  
      jwt.verify(token, jwtPassword,  async function (err, decode) {
        if (err) {
          res.status(400).json({
            message: "Invalid json web token",
          });
        } else {
          const id =  uuidv4(); 
          const title = req.body.title;
          const description = req.body.description;
          const price = req.body.price;
          const imageLink = req.body.imageLink;
  
          await Course.create({
            id: id,
            title: title,
            description: description,
            price: price,
            imageLink: imageLink,
          });
  
          res.json({
            message: "Course created successfully",
            courseId: id,
          });
        }
      });
    } catch (error) {
        console.log(error)
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  });
  

router.get("/courses", adminMiddleware, async (req, res) => {
    try {
        token = req.headers.authorization;
        const verify = await jwt.verify(token, jwtPassword, function (err, decode) {
          if (err) {
            res.status(400).json({
              message: "Invalid json web token",
            });
          }
        });

        await Course.find().then((courses) => {
            res.json(courses);
          });
      } catch (error) {
        res.status(500).json({
          message: "Interval Server Error",
        });
      }
});

module.exports = router;

