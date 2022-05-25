const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InstructorSchema = new Schema({
    name: String,
    courses: Array,
    created_at: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = Instructor = mongoose.model("Instructor", InstructorSchema);