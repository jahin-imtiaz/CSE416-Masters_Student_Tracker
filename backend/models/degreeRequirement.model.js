import mongoose from 'mongoose'

const Schema = mongoose.Schema;
Schema.Types.String.set('trim', true)
Schema.Types.String.set('lowercase', true)

const DegreeRequirementSchema = new Schema({
    department: { type: String, required: true },
    reqSem: { type: String, required: true },
    reqYear: { type: Number, required: true },
    requirements: Schema.Types.Mixed
});

DegreeRequirementSchema.index({ department: 1, reqVersionSem: 1, reqVersionYear: 1 })

const DegreeRequirement = mongoose.model("DegreeRequirement", DegreeRequirementSchema);

export default DegreeRequirement