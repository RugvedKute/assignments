const { Router } = require("express");
const { User, Admin, Course } = require("../db");
const adminMiddleware = require("../middleware/admin");
const router = Router();

// Admin Routes
router.post("/signup", async (req, res) => {
  username = req.body.username;
  password = req.body.password;
  await Admin.create({
    username: username,
    password: password,
  });
  res.json({
    msg: "The Admin created",
  });
});

router.post("/courses", adminMiddleware, async (req, res) => {
  courseId = req.body.courseId;
  title = req.body.title;
  description = req.body.description;
  price = req.body.price;
  imageLink = req.body.imageLink;

  await Course.create({
    courseId: courseId,
    title: title,
    description: description,
    price: price,
    imageLink: imageLink,
  });
  res.json({
    msg: "Course created successfully!",
  });
});

router.get("/courses", adminMiddleware, (req, res) => {
  Course.find().then((courses) => {
    res.json(courses);
  });
});

module.exports = router;
