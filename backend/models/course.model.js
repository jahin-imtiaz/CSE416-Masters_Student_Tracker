import mongoose from 'mongoose'

const Schema = mongoose.Schema;
Schema.Types.String.set('trim', true)
//Schema.Types.String.set('lowercase', true)

const CourseSchema = new Schema({
    course_name: { type: String, required: true },
    department: { type: String, required: true },
    course_num: { type: String, required: true },
    semester: { type: String, required: true },
    year: { type: String, required: true },
    credits: { type: Number, required: true },
    description: { type: String, lowercase: false },
    prerequisites: Schema.Types.Mixed
});

const Course = mongoose.model("Course", CourseSchema);

export default Course
