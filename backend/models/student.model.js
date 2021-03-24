import mongoose from 'mongoose'

const Schema = mongoose.Schema;
Schema.Types.String.set('trim', true)
Schema.Types.String.set('lowercase', true)

const StudentSchema = new Schema({
    _id: {
        sbu_id: { type: String, required: true, unique: true, trim: true, lowercase: true },
    },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    department: { type: String, required: true, trim: true },
    entryYear: { type: String, required: true, trim: true },
    entrySem: { type: String, required: true, trim: true },
    reqID: { type: Schema.Types.ObjectId, ref: "DegreeRequirement" },
    graduationSem: { type: String, trim: true },
    graduationYear: { type: String, trim: true },
    graduated: { type: Boolean, trim: true },
    password: { type: String, required: true, trim: true },
    coursePlan: Schema.Types.Mixed
});

// StudentSchema.index({ sbu_id: 'text'})

const Student = mongoose.model("Student", StudentSchema);

export default Student