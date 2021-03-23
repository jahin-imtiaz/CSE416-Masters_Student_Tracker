import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const degreeRequirementSchema = new Schema({
    requirements: {type: Array, "default": [], required: true},
    description: {type: Date, required: true},
    version: {type: String, required: true, trim: true}
});

const DegreeRequirement = mongoose.model("DegreeRequirement", degreeRequirementSchema);

export default DegreeRequirement