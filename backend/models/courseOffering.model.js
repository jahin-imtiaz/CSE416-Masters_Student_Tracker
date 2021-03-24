import mongoose from 'mongoose'

const Schema = mongoose.Schema;
Schema.Types.String.set('trim', true)
Schema.Types.String.set('lowercase', true)

const courseOfferingSchema = new Schema({
    department: {type: String, required: true, unique: true},
    semester: {type: String, required: true},
    year: {type: Date, required: true},
    start_time: {type: Date, required: true},
    end_time: {type: Date, required: true},
    courseID: {type: Schema.Types.ObjectId, ref: "Course", required: true}
});

const CourseOffering = mongoose.model("CourseOffering", courseOfferingSchema);

export default CourseOffering
