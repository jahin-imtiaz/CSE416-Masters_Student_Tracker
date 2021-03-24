import mongoose from 'mongoose'

const Schema = mongoose.Schema;
Schema.Types.String.set('trim', true)
Schema.Types.String.set('lowercase', true)

const courseSchema = new Schema({
    course_name: {type: String, required: true, unique: true},
    course_num: {type: String, required: true},
    number_of_credit: {type: Number, required: true},
    prerequisites: {type: [{course_name: String, course_num: Number}], required: true},
    description: {type: String}
});

const Course = mongoose.model("Course", courseSchema);

export default Course
