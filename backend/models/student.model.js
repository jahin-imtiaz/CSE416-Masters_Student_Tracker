import mongoose from 'mongoose'

const Schema = mongoose.Schema;
Schema.Types.String.set('trim', true)
Schema.Types.String.set('lowercase', true)

const StudentSchema = new Schema({
    _id: {
        sbu_id: { type: String, required: true, unique: true },
    },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    department: { type: String, required: true },
    entryYear: { type: String, required: true },
    entrySem: { type: String, required: true },
    password: { type: String, required: true, lowercase: false },
    reqID: { type: Schema.Types.ObjectId, ref: "DegreeRequirement" },
    graduationSem: { type: String },
    graduationYear: { type: String },
    coursePlan: Schema.Types.Mixed
});

// StudentSchema.index({ sbu_id: 'text'})

const Student = mongoose.model("Student", StudentSchema);

export default Student