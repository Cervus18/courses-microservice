const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    name: String,
    description: String,
    instructorId: String,
    created_at: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = Course = mongoose.model("Course", CourseSchema);