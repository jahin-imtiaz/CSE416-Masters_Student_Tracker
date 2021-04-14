import mongoose from 'mongoose'

const Schema = mongoose.Schema
Schema.Types.String.set('trim', true)
// Schema.Types.String.set('lowercase', true)

const StudentSchema = new Schema({
  _id: {
    sbu_id: { type: String, required: true, unique: true }
  },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true, lowercase: false },
  // For students with 2+ majors, add below to a Degree table
  entryYear: { type: String, required: true },
  entrySem: { type: String, required: true },
  // reqID: { type: Schema.Types.ObjectId, ref: "DegreeRequirement" },
  reqVersion: {
    department: { type: String },
    track: { type: String },
    reqSem: { type: String },
    reqYear: { type: String }
  },
  graduationSem: { type: String },
  graduationYear: { type: String }
})

// StudentSchema.index({ sbu_id: 'text'})

const Student = mongoose.model('Student', StudentSchema)

export default Student
