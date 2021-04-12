import mongoose from 'mongoose'

const Schema = mongoose.Schema
Schema.Types.String.set('trim', true)
//Schema.Types.String.set('lowercase', true)

const CourseSchema = new Schema({
  department: { type: String, required: true },
  course_name: { type: String, required: true },
  course_num: { type: String, required: true },
  credits: { type: String, required: true },
  description: { type: String },
  prerequisites: [String]
})

CourseSchema.index({ department: 1, course_name: 1, course_num: 1 })

const Course = mongoose.model('Course', CourseSchema)

export default Course
