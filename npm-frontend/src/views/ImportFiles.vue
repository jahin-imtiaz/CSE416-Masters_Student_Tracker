<template>
  <div class="hello">
    <NavBar />
    <b-container lg="10" offset="1" class="bv-example-row">
      <b-container fluid>
        <b-row>
          <b-col lg="4">Semester :</b-col>
          <b-col>
            <b-form-input
              aria-label="Small text input with custom switch"
              v-model="semester"
            ></b-form-input>
          </b-col>
        </b-row>

        <b-row>
          <b-col lg="4">Year :</b-col>
          <b-col>
            <b-form-input
              aria-label="Small text input with custom switch"
              v-model="year"
            ></b-form-input>
          </b-col>
        </b-row>

        <b-row>
          <b-col lg="4">Department :</b-col>
          <b-col>
            <b-form-input
              aria-label="Small text input with custom switch"
              v-model="department"
            ></b-form-input>
          </b-col>
        </b-row>

        <b-row lg="10">
          <b-col>
            <b-form-file
              v-model="courseFile"
              placeholder="Choose a Course file or drop it here..."
              drop-placeholder="Drop file here..."
            ></b-form-file>
          </b-col>
          <b-col>
            <b-row>
              <b-col>
                Selected file: {{ courseFile ? courseFile.name : '' }}
              </b-col>
              <b-col>
                <b-button variant="secondary" @click="loadCourseFile">
                  add
                </b-button>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-container>

      <b-row class="mt-3">
        <b-col>
          <b-form-file
            v-model="degreeReqFile"
            placeholder="Choose a Degree Requirement file or drop it here..."
            drop-placeholder="Drop file here..."
          ></b-form-file>
        </b-col>
        <b-col>
          <b-row>
            <b-col>
              Selected file: {{ degreeReqFile ? degreeReqFile.name : '' }}
            </b-col>
            <b-col>
              <b-button variant="secondary" @click="loadDegReqFile">
                add
              </b-button>
            </b-col>
          </b-row>
        </b-col>
      </b-row>

      <b-container lg="10" offset="1" class="bv-example-row">
        <b-row class="mt-3">
          <b-col>
            <b-form-file
              v-model="courseOfferingFile"
              placeholder="Choose a Course Offerings file or drop it here..."
              drop-placeholder="Drop file here..."
            ></b-form-file>
          </b-col>
          <b-col>
            <b-row>
              <b-col>
                Selected file:
                {{ courseOfferingFile ? courseOfferingFile.name : '' }}
              </b-col>
              <b-col>
                <b-button variant="secondary" @click="loadCourseOfferingFile">
                  add
                </b-button>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-container>

      <b-row class="mt-3">
        <b-col>
          <b-form-file
            v-model="studentFile"
            placeholder="Choose a Students file or drop it here..."
            drop-placeholder="Drop file here..."
          ></b-form-file>
        </b-col>
        <b-col>
          <b-row>
            <b-col>
              Selected file: {{ studentFile ? studentFile.name : '' }}
            </b-col>
            <b-col>
              <b-button variant="secondary" @click="loadStudentFile">
                add
              </b-button>
            </b-col>
          </b-row>
        </b-col>
      </b-row>

      <b-row>
        <b-col>
          <b-form-file
            v-model="coursePlanFile"
            placeholder="Choose a Course Plan file or drop it here..."
            drop-placeholder="Drop file here..."
          />
        </b-col>
        <b-col>
          <b-row>
            <b-col>
              Selected file: {{ coursePlanFile ? coursePlanFile.name : '' }}
            </b-col>
            <b-col>
              <b-button variant="secondary" @click="loadCoursePlanFile">
                add
              </b-button>
            </b-col>
          </b-row>
        </b-col>
      </b-row>

      <b-row class="mt-3">
        <b-col>
          <b-form-file
            v-model="gradesFile"
            placeholder="Choose a Grades file or drop it here..."
            drop-placeholder="Drop file here..."
          />
        </b-col>
        <b-col>
          <b-row>
            <b-col>
              Selected file: {{ gradesFile ? gradesFile.name : '' }}
            </b-col>
            <b-col>
              <b-button variant="secondary" @click="loadGradesFile">
                add
              </b-button>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
      <b-row v-if="invalidPlans && invalidPlans.length > 0">
        <b-col cols="8">
          These course plans are Invalid:
          <b-table striped hover :items="invalidPlans"></b-table>
          <b-button block :style="myStyle" size="sm" @click="notifyByEmail">
            Notify Students
          </b-button>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import emailjs from 'emailjs-com'
import NavBar from '@/components/NavBar.vue'
import '../env'
import axios from 'axios'

const { VUE_APP_BACKEND_API } = process.env

export default {
  name: 'import-files',
  props: {
    msg: String
  },
  components: {
    NavBar
  },
  data() {
    return {
      courseFile: null,
      degreeReqFile: null,
      courseOfferingFile: null,
      studentFile: null,
      coursePlanFile: null,
      gradesFile: null,
      semester: null,
      year: null,
      department: null,
      invalidPlans: null,
      studentsWithInvalidPlans: null,
      myStyle: {
        backgroundColor: '#800000',
        color: 'white',
        textAlign: 'center'
      }
    }
  },
  methods: {
    courseFileToJson(courseFileText) {
      /**
       * if "GRADUATE COURSE DESCRIPTIONS", then build json
       * sem and year: Spring 2021
       * department: AAS
       * description: ...
       * course title: ...
       * _ credits, Letter graded ...
       *
       *
       */
      let courseDesc = {}
      let currMajor = ''

      let text = courseFileText.split('\n')
      //console.log(text)
      text.forEach((value, index) => {
        if (value.match(/^[A-Z]{3}$/gm)) {
          currMajor = value.trim()
          courseDesc[currMajor] = {}
          courseDesc[currMajor].department = text[index + 1].trim()
          courseDesc[currMajor].courses = []
        } else if (
          value.match(/^[A-Z]{3} {2}[0-9]{3}:/gm) &&
          value.includes(currMajor)
        ) {
          let n = value.indexOf(':')
          let course = {
            courseNum: value.substring(n - 3, n),
            courseName: value.substring(n + 2).trim(),
            description: '',
            prereqs: [],
            credits: '3'
          }
          let m = text[index + 1].trim().indexOf('Prerequisite')

          // Outlier
          if (value.includes('BMI  540')) {
            course.prereqs.push('BMI 501')
          }
          if (m > 0) {
            // prereq in desc
            course.description = text[index + 1].substring(0, m).trim()
            let n = text[index + 1].lastIndexOf(':')
            let str = text[index + 1]
              .substring(n + 1)
              .trim()
              .replace('and', ',')
            str.split(/[.,]| {1}or {1}/gi).forEach((element) => {
              element = element.trim()
              if (element.match(/^[A-Z]{3} {1}5[0-9]{2}$/gm)) {
                course.prereqs.push(element)
              } else if (element.match(/^[A-Z]{3}5[0-9]{2}$/gm)) {
                course.prereqs.push(element.replace(/([A-Z])([0-9])/g, '$1 $2'))
              }
            })
            if (text[index + 2].includes('credit')) {
              let m = text[index + 2].indexOf('credit')
              // variable number of credits
              if (text[index + 2].match(/[0-9]-[0-9] credit/g)) {
                course.credits = text[index + 2].substring(m - 4, m).trim()
              }
              // set number of credits
              else {
                course.credits = text[index + 2].substring(m - 2, m).trim()
              }
            }
            if (value.includes('ESE  506')) {
              course.prereqs.pop()
            }
          } else {
            // prereq not in desc
            course.description = text[index + 1].trim()
            // credits on 4th line of a course entry (course has prereq)
            if (text[index + 2].includes('Prerequisite')) {
              let n = text[index + 2].indexOf(':')
              let str = text[index + 2]
                .substring(n + 1)
                .trim()
                .replace('and', ',')
              str.split(/[.,]| {1}or {1}/gi).forEach((element) => {
                element = element.trim()
                if (element.match(/^[A-Z]{3} {1}5[0-9]{2}/gm)) {
                  course.prereqs = element.match(/^[A-Z]{3} {1}5[0-9]{2}/gm)
                } else if (element.match(/^[A-Z]{3}5[0-9]{2}$/gm)) {
                  course.prereqs = element
                    .match(/^[A-Z]{3}5[0-9]{2}$/gm)
                    .map((value) => value.replace(/([A-Z])([0-9])/g, '$1 $2'))
                }
              })
              if (value.includes('AMS  594')) {
                course.prereqs.unshift('AMS 512')
              }
              if (text[index + 3].includes('credit')) {
                let m = text[index + 3].indexOf('credit')
                // variable number of credits
                if (text[index + 3].match(/[0-9]-[0-9] credit/g)) {
                  course.credits = text[index + 3].substring(m - 4, m).trim()
                }
                // set number of credits
                else {
                  course.credits = text[index + 3].substring(m - 2, m).trim()
                }
              }
            }
            // credits on 3rd line of course entry (course has no prereq)
            else if (text[index + 2].includes('credit')) {
              let m = text[index + 2].indexOf('credit')
              // variable number of credits
              if (text[index + 2].match(/[0-9]-[0-9] credit/g)) {
                course.credits = text[index + 2].substring(m - 4, m).trim()
              }
              // set number of credits
              else {
                course.credits = text[index + 2].substring(m - 2, m).trim()
              }
            }
          }
          courseDesc[currMajor].courses.push(course)
        }
      })
      //console.log(courseDesc)
      return courseDesc
    },
    loadCourseFile() {
      const file = this.courseFile
      if (file == null) return
      const reader = new FileReader()
      reader.onload = (e) => {
        let courseFileText = e.target.result
        //console.log(this.courseFileToJson(courseFileText))
        let courseData = this.courseFileToJson(courseFileText)

        console.log(courseData)
        axios
          .post(`${VUE_APP_BACKEND_API}/courses/add-many`, courseData)
          .then(() => {
            console.log(`Added ${courseData.length} courses`)
          })
          .catch((err) => {
            console.log(err)
          })

        this.courseFile = null
      }
      reader.readAsText(file)
    },
    loadDegReqFile() {
      const file = this.degreeReqFile
      if (file == null) return
      const reader = new FileReader()
      reader.onload = (e) => {
        let reqJson = JSON.parse(e.target.result)
        console.log(reqJson)

        let reqData = {}
        reqData.department = reqJson.dept
        reqData.reqSem = reqJson.req_ver_sem
        reqData.reqYear = reqJson.req_ver_year
        reqData.requirements = reqJson

        console.log(reqData)
        axios
          .post(`${VUE_APP_BACKEND_API}/requirements/add`, reqData)
          .then(() => {
            console.log(
              `Added Requirement Version for ${reqJson.dept} for ${reqJson.req_ver_sem}${reqJson.req_ver_year}`
            )
          })
          .catch((err) => {
            console.log(err)
          })

        this.degreeReqFile = null
      }
      reader.readAsText(file)
    },
    loadCourseOfferingFile() {
      const file = this.courseOfferingFile
      if (file == null) return
      const reader = new FileReader()
      let courseOfferingsArr = []
      reader.onload = (e) => {
        let text = e.target.result
        text = text.split('\n')
        console.log(text)
        for (let i = 1; i < text.length; i++) {
          let newCourseOffering = {}
          // split csv text by commas (disregarding commas in quotes)
          let currCourse = text[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/g) // .split("/[^\"],[^\"]/")
          newCourseOffering.department = currCourse[0]
          newCourseOffering.course_num = currCourse[1]
          newCourseOffering.section = currCourse[2]
          newCourseOffering.semester = currCourse[3]
          newCourseOffering.year = currCourse[4]

          let timeSplit = currCourse[5].split(' ')
          let times = timeSplit[1].split('-')

          newCourseOffering.days = timeSplit[0]
          newCourseOffering.start_time = times[0]
          newCourseOffering.end_time = times[1]
          courseOfferingsArr.push(newCourseOffering)
        }
        console.log(courseOfferingsArr)
        // On import, if student has course plan entries that are not offered that semester, notify them
        axios
          .post(
            `${VUE_APP_BACKEND_API}/courseofferings/add-many`,
            courseOfferingsArr
          )
          .then((response) => {
            // get all invalid CoursePlan objects so that the student may be notified and updated
            this.invalidPlans = response.data.allInvalidCoursePlans
            this.studentsWithInvalidPlans =
              response.data.allStudentIDWithInvalidPlan
            // TODO: notify student
            console.log(`UPSERTED OFFERINGS`)
          })
          .catch((err) => {
            console.log(err)
          })
        this.courseOfferingFile = null
      }
      reader.readAsText(file)
    },
    loadStudentFile() {
      const file = this.studentFile
      if (file == null) return
      const reader = new FileReader()
      let studentsArr = []
      reader.onload = (e) => {
        let text = e.target.result
        text = text.split('\n')
        for (let i = 1; i < text.length; i++) {
          let newStudent = { reqVersion: {} }
          let currStudent = text[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/g)
          newStudent['_id.sbu_id'] = currStudent[0]
          newStudent.firstName = currStudent[1]
          newStudent.lastName = currStudent[2]
          newStudent.email = currStudent[3]
          newStudent.reqVersion.department = currStudent[4]
          newStudent.reqVersion.track = currStudent[5]
          newStudent.entrySem = currStudent[6]
          newStudent.entryYear = currStudent[7]
          newStudent.reqVersion.reqSem = currStudent[8]
          newStudent.reqVersion.reqYear = currStudent[9]
          newStudent.graduationSem = currStudent[10]
          newStudent.graduationYear = currStudent[11]
          newStudent.password = currStudent[12]

          studentsArr.push(newStudent)
        }
        console.log(studentsArr)
        axios
          .post(`${VUE_APP_BACKEND_API}/students/add-many`, studentsArr)
          .then(() => {
            console.log(`UPSERTED STUDENTS`)
          })
          .catch((err) => {
            console.log(err)
          })

        this.studentFile = null
      }
      reader.readAsText(file)
    },
    loadCoursePlanFile() {
      const file = this.coursePlanFile
      if (file == null) return
      const reader = new FileReader()
      let coursePlanArr = []
      reader.onload = (e) => {
        let text = e.target.result
        text = text.split('\n')
        for (let i = 1; i < text.length; i++) {
          let newCoursePlan = {}
          let currPlan = text[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/g)
          newCoursePlan.sbu_id = currPlan[0]
          newCoursePlan.department = currPlan[1]
          newCoursePlan.course_num = currPlan[2]
          newCoursePlan.section = currPlan[3]
          newCoursePlan.semester = currPlan[4]
          newCoursePlan.year = currPlan[5]
          newCoursePlan.grade = currPlan[6]

          coursePlanArr.push(newCoursePlan)
        }
        console.log(coursePlanArr)
        axios
          .post(`${VUE_APP_BACKEND_API}/courseplans/add-many`, coursePlanArr)
          .then(() => {
            console.log(`UPSERTED COURSE PLANS`)
          })
          .catch((err) => {
            console.log(err)
          })
        this.coursePlanFile = null
      }
      reader.readAsText(file)
    },
    // loadGradesFile seperated to use this.gradesFile instead of this.coursePlanFile as a lock
    loadGradesFile() {
      const file = this.gradesFile
      if (file == null) return
      const reader = new FileReader()
      let gradesArr = []
      reader.onload = (e) => {
        let text = e.target.result
        text = text.split('\n')
        for (let i = 1; i < text.length; i++) {
          let newGrade = {}
          let curGrade = text[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/g)
          newGrade.sbu_id = curGrade[0]
          newGrade.department = curGrade[1]
          newGrade.course_num = curGrade[2]
          newGrade.section = curGrade[3]
          newGrade.semester = curGrade[4]
          newGrade.year = curGrade[5]
          newGrade.grade = curGrade[6]

          gradesArr.push(newGrade)
        }
        console.log(gradesArr)
        axios
          .post(`${VUE_APP_BACKEND_API}/courseplans/add-many`, gradesArr)
          .then(() => {
            console.log(`UPSERTED GRADES`)
          })
          .catch((err) => {
            console.log(err)
          })
        this.gradesFile = null
      }
      reader.readAsText(file)
    },
    async notifyByEmail() {
      let studentsToNotify = this.allStudentIDWithInvalidPlan
      let studentObjects = await this.getStudents(studentsToNotify)

      this.invalidPlans = null
      this.allStudentIDWithInvalidPlan = null

      for (let student of studentObjects) {
        try {
          emailjs.sendForm(
            'service_ni0hpok',
            'template_fxavcho',
            e.target,
            'user_OqXjsxM8u5mrHbPiO0mXd',
            {
              name: student.firstName + ' ' + student.lastName,
              to_email: student.email
            }
          )
        } catch (error) {
          console.log({ error })
        }
      }
    },
    async getStudents(studentIDs) {
      try {
        const response = await axios.get(
          `${VUE_APP_BACKEND_API}/students/getManyByID`,
          {
            params: {
              studentIds: studentIDs
            }
          }
        )
        return response.data
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style>
.importFileDiv {
  background-color: antiquewhite;
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #79d0b2;
}
</style>
