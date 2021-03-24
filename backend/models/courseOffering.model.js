import mongoose from 'mongoose'

const Schema = mongoose.Schema;
Schema.Types.String.set('trim', true)
Schema.Types.String.set('lowercase', true)

const CourseOfferingSchema = new Schema({
    courseID: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    semester: { type: String, required: true },
    year: { type: String, required: true },
    start_time: { type: Date, required: true },
    end_time: { type: Date, required: true },
});

const CourseOffering = mongoose.model("CourseOffering", CourseOfferingSchema);

export default CourseOffering
