const { Router } = require("express");
const { User, Course } = require("../db");
const router = Router();
const userMiddleware = require("../middleware/user");

// User Routes
router.post("/signup", async (req, res) => {
  username = req.body.username;
  password = req.body.password;
  await User.create({
    username: username,
    password: password,
  });
  res.json({
    msg: "The User has been created",
  });
});

router.get("/courses", (req, res) => {
  Course.find().then((courses) => {
    res.json(courses);
  });
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const course = await Course.findOne({
            courseId: courseId
        });

        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }

        const username = req.headers.username;
        const user = await User.findOne({ username: username });

        if (!user) {
            return res.status(404).json({ error: 'User does not exist' });
        }

        // Check if the user already has the course
        if (user.courses.includes(courseId)) {
            return res.status(400).json({ error: 'User already has this course' });
        }

        user.courses.push(courseId);
        await user.save(); // Save the changes to the user document

        res.json({
            'msg': 'Course purchased successfully!'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {

    const user = await User.findOne({
        username: req.headers.username
    })

    if(user) {
        res.json({
            data: user.courses,
        })
    } else {
        res.json({
            msg: 'No user found'
        })
     
    }
  
});

module.exports = router;
