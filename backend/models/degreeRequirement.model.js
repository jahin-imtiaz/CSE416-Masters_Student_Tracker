import mongoose from 'mongoose'

const Schema = mongoose.Schema;
Schema.Types.String.set('trim', true)
Schema.Types.String.set('lowercase', true)

const DegreeRequirementSchema = new Schema({
    department: { type: String, required: true },
    reqVersionSem: { type: String, required: true },
    reqVersionYear: { type: String, required: true },
    requirements: Schema.Types.Mixed
});

DegreeRequirementSchema.index({ department: 1, reqVersionSem: 1, reqVersionYear: 1 })

const DegreeRequirement = mongoose.model("DegreeRequirement", DegreeRequirementSchema);

export default DegreeRequirement