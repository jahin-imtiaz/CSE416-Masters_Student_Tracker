# CSE416-Masters_Student_Tracker

A web system to keep track of the masters student at Stony Brook University, where graduate M.S. students will be able to keep track of their degree requirements and course plan. Graduate program directors will be able to look up student data and modify them accordingly.

## HW6

## 1. Persistence

### 1.1 Data model
## Schemas
 **Course Schema**
```js
const CourseSchema = new Schema({
	department: { type: String, required: true },
	course_name: { type: String, required: true },
	course_num: { type: String, required: true },
	credits: { type: String, required: true },
	description: { type: String },
	prerequisites: Schema.Types.Mixed
})

CourseSchema.index({ department: 1, course_name: 1, course_num: 1 })
```
Our Course model has department, course_name, number of credits attributes as well as a prerequisites attribute that is a of type Mixed which indicates a schema-less type that will be appropriate to represent our prerequisites objects. We also have an index on our department, course_name, and course_num fields.

**Student Schema**
```js
const StudentSchema = new Schema({
    _id: {
        sbu_id: { type: String, required: true, unique: true }
    },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, lowercase: false },
    entryYear: { type: String, required: true },
    entrySem: { type: String, required: true },
    reqVersion: {
        department: { type: String },
        reqSem: { type: String },
        reqYear: { type: String }
    },
    graduationSem: { type: String },
    graduationYear: { type: String }
})
```
Our Student model has attributes such as firstName, lastName, email, password. We decided to have the reqVersion as an object since it contains information such as department, reqSem, reqYear.

**CourseOffering Schema**
```js
const CourseOfferingSchema = new Schema({
    courseID: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    section: { type: String },
    semester: { type: String, required: true },
    year: { type: String, required: true },
    days: { type: String, required: true },
    start_time: { type: String, required: true },
    end_time: { type: String, required: true }
})
```
Our CourseOffering model represents information about a course during a given year and semester. Thus, it has attributes such as courseID which references a Course document, the semester, year, start_time and end_time.

**CoursePlan Schema**
```js
const CoursePlanSchema = new Schema({
    sbu_id: { type: String, required: true },
    department: { type: String, required: true },
    course_num: { type: String, required: true },
    section: { type: String, trim: true },
    semester: { type: String, required: true },
    year: { type: String, required: true },
    grade: { type: String },
    invalid: { type: Boolean, default: false }
})
```
Our CoursePlan model represents information about a Course Plan such as the sbu_id of the student that this plan is attached to, the department, year, grade, as well as an invalid field to indicate whether the Course Plan is valid or not.

**DegreeRequirement Schema** 
```js
const DegreeRequirementSchema = new Schema({
    department: { type: String, required: true },
    reqSem: { type: String, required: true },
    reqYear: { type: Number, required: true },
    requirements: Schema.Types.Mixed
})
DegreeRequirementSchema.index({ department: 1, reqVersionSem: 1, reqVersionYear: 1 })
```
Our DegreeRequirement model represents the information about a DegreeRequirement which includes department, the semester and year related to this requirement as well as a requirements field which is a Mixed type since will have different types of Requirements. We decided to index based on department, the requirement version semester and year.

### 1.2 Queries

```js
router.get('/', async (req, res, next) => {
	try {
		const students = await Student.find({}, {}).exec()
		res.send(students)
	} catch (err) {
		logger.error(err)
		next(err)
	}
})
```
For now, we are using application code to run a MongoDB query that returns all student documents in the Student collection by performing a GET request to this endpoint in our API. We plan on having other endpoints where we can pass in search parameters such as name, department in order to filter out students.

## 2. Code Conventions

JavaScript Standard Style: https://standardjs.com/rules-en.html
We use ESLint with Standard Style plugin as a style checker and Prettier to maintain consistent formatting

## 3. Implementation Status Report

SEE [IMPLEMENTATION GRADING SHEET](implementation-grading-sheet-SADGE_GOOMBAS.xlsx)

SEE [IMPLEMENTATION STATUS](implementation-status-SADGE_GOOMBAS.md)

## 4. Installation Manual

SEE [INSTALLATION MANUAL](installation-manual.md)


## 5. Test Report

SEE [TEST REPORT](test-report.md)


## 6. Contributions

A list of each team member's contributions to hw5 and hw6, including main activities and work products. Additional guidance appears in the teamwork policy on the course web page.

- Taner: video, writing markdown files, implementing models and routes, installation manual
- Jahin: import files, import functionality frontend, implementing data models, Add Student Front end
- William: frontend components, styling, requirements JSON, setting up and writing homework documents, test report
- Nur: implementing data models, data model and queries

## 7. Code and Data

SEE "import files" FOLDER FOR DATA FILES

## 8. Requirements

Current version of the requirements document.

Version: 2021-03-17

## 9. Design

Current version of the design documents.

Version: 2021-03-09

## 10. Video

Video is attached with the BB submission.
