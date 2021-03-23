import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const studentSchema = new Schema({
    _id: {
        sbu_id: { type: String, required: true, unique: true, trim: true },
    },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    department: { type: String, required: true, trim: true },
    entryYear: { type: String, required: true, trim: true },
    entrySem: { type: String, required: true, trim: true },
    reqID: { type: Schema.Types.ObjectId, ref: "DegreeRequirement" },
    graduationSem: { type: String, required: true, trim: true },
    graduationYear: { type: String, required: true, trim: true },
    graduated: { type: Boolean, trim: true },
    password: { type: String, required: true, trim: true },
    coursePlan: Schema.Types.Mixed
});

// studentSchema.index({ sbu_id: 'text'})

const Student = mongoose.model("Student", studentSchema);

export default Student