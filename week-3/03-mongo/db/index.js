const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect(
    `mongodb://admin:admin@ac-cfxipq2-shard-00-00.tnx40df.mongodb.net:27017,ac-cfxipq2-shard-00-01.tnx40df.mongodb.
    net:27017,ac-cfxipq2-shard-00-02.tnx40df.mongodb.net:27017/?replicaSet=atlas-4zfuy5-shard-0&ssl=true&authSource=admin`
)
.then(() => {
    console.log('Database connection established')
})

// Define schemas
const AdminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    courses: [{
        type: Number
    }]
});

const CourseSchema = new mongoose.Schema({
    courseId: {
        type: String,
        unique: true
    },
    title: String,
    description: String,
    price: Number,
    imageLink: String
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}