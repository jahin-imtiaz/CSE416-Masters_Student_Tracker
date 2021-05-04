<template>
  <div class="view-edit-student">
    <NavBar />
    <br />
    <br />

    <b-container>
      <b-row>
        <b-col>
          <b-form-group
            id="studentID"
            label-cols-sm="4"
            content-cols-sm="8"
            label="Student ID"
            label-for="studentID"
          >
            <b-form-input id="studentID" :placeholder="studentID"
            :value="studentID" v-model="studentID" readonly: True />
          </b-form-group>
          <b-form-group
            id="nameID"
            label-cols-sm="4"
            content-cols-sm="8"
            label="Name"
            label-for="name"
          >
            <b-form-input id="name" v-model="name"></b-form-input>
          </b-form-group>
          <b-form-group
            id="emailID"
            label-cols-sm="4"
            content-cols-sm="8"
            label="Email"
            label-for="email"
          >
            <b-form-input id="email" v-model="email"></b-form-input>
          </b-form-group>
          <b-form-group
            id="departmentID"
            label-cols-sm="4"
            content-cols-sm="8"
            label="Department"
            label-for="department"
          >
            <b-form-input id="department" v-model="department"></b-form-input>
          </b-form-group>
          <b-form-group
            id="trackID"
            label-cols-sm="4"
            content-cols-sm="8"
            label="Track"
            label-for="track"
          >
            <b-form-input id="track" v-model="track"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group
            id="entryYearID"
            label-cols-sm="4"
            content-cols-sm="8"
            label="Entry Year"
            label-for="entryYear"
          >
            <b-form-input id="entryYear" v-model="entryYear"></b-form-input>
          </b-form-group>
          <b-form-group
            id="entrySemID"
            label-cols-sm="4"
            content-cols-sm="8"
            label="Entry Semester"
            label-for="entrySem"
          >
            <b-form-input id="entrySem" v-model="entrySem"></b-form-input>
          </b-form-group>
          <b-form-group
            id="reqVerID"
            label-cols-sm="4"
            content-cols-sm="8"
            label="Req. Version"
            label-for="reqVersion"
          >
            <b-form-input id="reqVersion" v-model="reqVersion"></b-form-input>
          </b-form-group>
          <b-form-group
            id="gradDateID"
            label-cols-sm="4"
            content-cols-sm="8"
            label="Graduation Date"
            label-for="gradDate"
          >
            <b-form-input id="gradDate" v-model="gradDate"></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="2">
          Course Plan
          <b-button-group vertical>
            <div>
              <router-link :to="'/suggest-course-plan/' + this.studentID">
                <b-button
                  block
                  :style="myStyle"
                  size="sm"
                  @click="suggestCoursePlan"
                >
                  Suggest Course Plan
                </b-button>
              </router-link>
            </div>
            <div class="mt-2">
              <router-link :to="'/add-course/' + this.studentID">
                <b-button block :style="myStyle" size="sm" @click="addCourse">
                  Add Course
                </b-button>
              </router-link>
            </div>
          </b-button-group>
        </b-col>
        <b-col>
          <b-row>
            <!-- <b-col cols="6">Course Name</b-col>
            <b-col cols="2">Credits</b-col>
            <b-col cols="2">Grade</b-col>
            <b-col cols="2">Status</b-col> -->

            <b-table hover :items="coursePlans" />
          </b-row>
        </b-col>
      </b-row>
      <br />
      <br />
      <b-row>
        <b-col cols="2">Course Requirements</b-col>
        <b-col>
          <b-row>
            <!-- <b-col cols="8">Requirements</b-col>
            <b-col cols="4">Status</b-col> -->
            <b-table hover :items="requirements" />
          </b-row>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="2">Comment</b-col>
        <b-col>
          <b-form-textarea
            id="textarea"
            v-model="comment"
            placeholder="Enter something..."
            rows="3"
            max-rows="6"
          ></b-form-textarea>
        </b-col>
      </b-row>
      <b-col class="text-right">
        <b-button-group>
          <div class="mt-2">
            <b-button block :style="myStyle" size="sm" @click="saveChanges">
              Save Changes
            </b-button>
          </div>
        </b-button-group>
      </b-col>
    </b-container>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import CheckRequirements from '../checkRequirements.js'
import axios from 'axios'
const { VUE_APP_BACKEND_API } = process.env

const checkReqs = new CheckRequirements()

export default {
  name: 'ViewEditGPD',
  data() {
    return {
      studentID: this.$route.params.studentID,
      name: '',
      email: '',
      department: '',
      track: '',
      entryYear: '',
      entrySem: '',
      reqVersion: '',
      gradDate: '',
      coursePlans: [
        { course: 'CSE 512', credits: 3, grade: 'A', status: 'satisfied' },
        { course: 'CSE 504', credits: 3, grade: 'A', status: 'satisfied' }
      ],
      requirements: [],
      comment: '',
      myStyle: {
        backgroundColor: '#800000',
        color: 'white',
        textAlign: 'center'
      }
    }
  },
  methods: {
    suggestCoursePlan() {},
    addCourse() {},
    saveChanges() {
      let data = {
        _id: { sbu_id: this.studentID },
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        comment: this.comment,
        // For students with 2+ majors, add below to a Degree table
        entryYear: this.entryYear,
        entrySem: this.entrySem,
        reqVersion: {
          department: this.department,
          track: this.track,
          reqSem: this.reqVersion.split(' ')[0],
          reqYear: this.reqVersion.split(' ')[1]
        },
        // reqID: { type: Schema.Types.ObjectId, ref: "DegreeRequirement" },
        graduationSem: this.gradDate.split(' ')[0],
        graduationYear: this.gradDate.split(' ')[1]
      }

      axios
        .post(`${VUE_APP_BACKEND_API}/students/add`, data)
        .then((res) => {
          console.log('UPSERTED STUDENT', res.data)
          alert('Saved changes')
          this.name = res.data.firstName + ' ' + res.data.lastName
          this.email = res.data.email
          this.department = res.data.reqVersion.department || 'CSE'
          this.track = res.data.reqVersion.track || 'Special Project'
          this.entryYear = res.data.entryYear
          this.comment = res.data.comment
          this.entrySem = res.data.entrySem
          this.reqVersion =
            res.data.reqVersion.reqSem + ' ' + res.data.reqVersion.reqYear
          this.gradDate = res.data.graduationSem + ' ' + res.data.graduationYear
        })
        .catch((err) => {
          console.log('RETRIEVE STUDENT FAILED', err)
        })
    },
    getStudent() {
      axios
        .get(`${VUE_APP_BACKEND_API}/students/getOneByID`, {
          params: {
            id: this.studentID
          }
        })
        .then((res) => {
          console.log('RETRIEVE STUDENT', res.data)
          this.name = res.data.firstName + ' ' + res.data.lastName
          this.email = res.data.email
          this.department = res.data.reqVersion.department || 'CSE'
          this.track = res.data.reqVersion.track || 'Special Project'
          this.entryYear = res.data.entryYear
          this.entrySem = res.data.entrySem
          this.comment = res.data.comment
          this.reqVersion =
            res.data.reqVersion.reqSem + ' ' + res.data.reqVersion.reqYear
          this.gradDate = res.data.graduationSem + ' ' + res.data.graduationYear
        })
        .catch((err) => {
          console.log('RETRIEVE STUDENT FAILED', err)
        })

      // load course plans
      checkReqs
        .getStudentCoursePlans(this.studentID)
        .then((plans) => {
          this.coursePlans = plans.map((plan) => {
            return {
              course: plan.department + ' ' + plan.course_num,
              grade: plan.grade,
              suggested: plan.isSuggested
            }
          })
        })
        .catch((err) => console.log(err))

      // load requirements
      checkReqs
        .getDegreeRequirementState(this.studentID)
        .then((reqs) => {
          console.log(reqs)
          this.requirements = reqs
        })
        .catch((err) => console.log(err))
    }
  },
  mounted() {
    // save studentID from route.params to vuex state
    this.$store.commit('setStudentID', this.$route.params.studentID)
    this.getStudent()
  },
  props: {},
  watch: {
    $route(to, from) {
      // react to route changes...
      console.log(to, from)
      this.$store.commit('setStudentID', this.$route.params.studentID)
    }
  },
  components: {
    NavBar
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
  color: #42b983;
}
</style>
