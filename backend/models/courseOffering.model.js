const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const courseOfferingSchema = new Schema({
    department: {type: String, required: true, unique: true, trim: true},
    semester: {type: String, required: true, trim: true},
    year: {type: Date, required: true},
    start_time: {type: Date, required: true},
    end_time: {type: Date, required: true},
    courseID: {type: Schema.Types.ObjectId, ref: "Course", required: true}
});

const CourseOffering = mongoose.model("CourseOffering", courseOfferingSchema);
module.exports = CourseOffering;
