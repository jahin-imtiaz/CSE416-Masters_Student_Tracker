import mongoose from 'mongoose'

const Schema = mongoose.Schema
Schema.Types.String.set('trim', true)
// Schema.Types.String.set('lowercase', true)

const CoursePlanSchema = new Schema({
  sbu_id: { type: String, required: true },
  department: { type: String, required: true },
  course_num: { type: String, required: true },
  section: { type: String, trim: true },
  semester: { type: String, required: true },
  year: { type: String, required: true },
  grade: { type: String },
  invalid: { type: Boolean, default: false },
  isSuggested: {type: Boolean, default: false}
})

const CoursePlan = mongoose.model('CoursePlan', CoursePlanSchema)

export default CoursePlan
