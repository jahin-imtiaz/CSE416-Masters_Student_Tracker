import mongoose from 'mongoose'

const Schema = mongoose.Schema;
Schema.Types.String.set('trim', true)
Schema.Types.String.set('lowercase', true)

const DegreeRequirementSchema = new Schema({
    requirements: { type: Array, "default": [], required: true },
    reqVersionSem: { type: String, unique: true },
    reqVersionYear: { type: String, unique: true },
    description: { type: String, lowercase: false }
});

const DegreeRequirement = mongoose.model("DegreeRequirement", DegreeRequirementSchema);

export default DegreeRequirement