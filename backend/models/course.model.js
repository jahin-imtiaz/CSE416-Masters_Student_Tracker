import mongoose from 'mongoose'

const Schema = mongoose.Schema;
Schema.Types.String.set('trim', true)
Schema.Types.String.set('lowercase', true)

const courseSchema = new Schema({
    course_name: { type: String, required: true },
    course_num: { type: String, required: true },
    semester: { type: String, required: true },
    year: { type: String, required: true },
    number_of_credit: { type: Number, required: true },
    description: { type: String, lowercase: false },
    prerequisites: Schema.Types.Mixed
});

const Course = mongoose.model("Course", courseSchema);

export default Course
