const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const courseSchema = new Schema({
    course_name: {type: String, required: true, unique: true, trim: true},
    course_num: {type: String, required: true, trim: true},
    description: {type: Date, required: true},
    number_of_credit: {type: Number, required: true},
    prerequisites: {type: [{course_name: String, course_num: Number}], required: true}
});

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
