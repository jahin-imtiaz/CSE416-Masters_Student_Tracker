import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const studentSchema = new Schema({
    _id: {
        sbu_id: { type: String, required: true, unique: true, trim: true },
    },
    first_name: { type: String, required: true, trim: true },
    last_name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    entry_year: { type: String, required: true, trim: true },
    entry_semester: { type: String, required: true, trim: true },
    department: { type: String, required: true, trim: true },
    reqID: { type: Schema.Types.ObjectId, ref: "DegreeRequirement" },
    graduation: { type: String, required: true, trim: true },
    coursePlan: Schema.Types.Mixed
});

// studentSchema.index({ sbu_id: 'text'})

const Student = mongoose.model("Student", studentSchema);

export default Student