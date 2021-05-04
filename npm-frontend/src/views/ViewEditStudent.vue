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
            <b-form-input
              id="studentID"
              :placeholder="studentID"
              :value="studentID"
              v-model="studentID"
              :readOnly="true"
            />
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
            label-for="reqVer"
          >
            <b-form-input id="reqVer" v-model="reqVer"></b-form-input>
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
        <b-col>{{ this.comment }}</b-col>
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
import axios from 'axios'
const { VUE_APP_BACKEND_API } = process.env

export default {
  name: 'ViewEditStudent',
  data() {
    return {
      studentID: this.$route.params.studentID,
      name: '',
      email: '',
      department: '',
      track: '',
      entryYear: '',
      entrySem: '',
      reqVer: '',
      gradDate: '',
      coursePlans: [
        { course_name: 'CSE 512', credits: 3, grade: 'A', status: 'satisfied' },
        { course_name: 'CSE 504', credits: 3, grade: 'A', status: 'satisfied' }
      ],
      requirements: [
        { requirements: 'Breadth - Theory', status: 'satisfied' },
        { requirements: 'Breadth - Systems', status: 'satisfied' },
        {
          requirements: 'Breadth - Information and Intelligent Systems',
          status: 'unsatisfied'
        },
        {
          requirements: 'Track - Special Project',
          status: 'pending'
        },
        {
          requirements: 'GPA - 3.0',
          status: 'satisfied'
        },
        {
          requirements: 'Credits - 31.0',
          status: 'unsatisfied'
        }
      ],
      comment: 'Student is on track Special Project',
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
    saveChanges() {},
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
          this.reqVersion =
            res.data.reqVersion.reqSem + ' ' + res.data.reqVersion.reqYear
          this.gradDate = res.data.graduationSem + ' ' + res.data.graduationYear
        })
        .catch((err) => {
          console.log('RETRIEVE STUDENT FAILED', err)
        })
    }
  },
  mounted() {
    this.getStudent()
  },
  props: {},
  watch: {
    $route(to, from) {
      // react to route changes...
      console.log(to, from)
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
