<template>
  <div class="browse-search-student">
    <NavBar />
    <br />
    <br />
    <b-container class="bv-example-row">
      <b-row>
        <b-col lg="6" class="my-1">
          <b-form-group
            label="Sort"
            label-for="sort-by-select"
            label-cols-sm="2"
            label-align-sm="right"
            class="mb-0"
            v-slot="{ ariaDescribedby }"
          >
            <b-input-group size="sm">
              <b-form-select
                id="sort-by-select"
                v-model="sortBy"
                :options="sortOptions"
                :aria-describedby="ariaDescribedby"
                class="w-75"
              >
                <template #first>
                  <option value="">-- none --</option>
                </template>
              </b-form-select>

              <b-form-select
                v-model="sortDesc"
                :disabled="!sortBy"
                :aria-describedby="ariaDescribedby"
                size="sm"
                class="w-25"
              >
                <option :value="false">Asc</option>
                <option :value="true">Desc</option>
              </b-form-select>
            </b-input-group>
          </b-form-group>
        </b-col>

        <b-col lg="6" class="my-1"></b-col>

        <b-col lg="6" class="my-1">
          <b-form-group
            label="Filter"
            label-for="filter-input"
            label-cols-sm="2"
            label-align-sm="right"
            class="mb-0"
          >
            <b-input-group size="sm">
              <b-form-input
                id="filter-input"
                v-model="filter"
                type="search"
                placeholder="Type to Search"
              ></b-form-input>

              <b-input-group-append>
                <b-button :disabled="!filter" @click="filter = ''">
                  Clear
                </b-button>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-col>

        <b-col lg="6" class="my-1">
          <b-form-group
            v-model="sortDirection"
            label="Filter On"
            label-cols-sm="2"
            label-align-sm="right"
            class="mb-0"
            v-slot="{ ariaDescribedby }"
          >
            <b-form-checkbox-group
              v-model="filterOn"
              :aria-describedby="ariaDescribedby"
              class="mt-1"
            >
              <b-form-checkbox value="name">Name</b-form-checkbox>
              <b-form-checkbox value="graduation_semester">
                Graduation Semester
              </b-form-checkbox>
              <b-form-checkbox value="course_plan_status">
                Course Plan Validity
              </b-form-checkbox>
              <b-form-checkbox value="number_of_degree_requirements">
                Course Plan Completeness
              </b-form-checkbox>
            </b-form-checkbox-group>
          </b-form-group>
        </b-col>

        <b-col sm="5" md="6" class="my-1">
          <b-form-group
            label="Per page"
            label-for="per-page-select"
            label-cols-sm="2"
            label-align-sm="right"
            class="mb-0"
          >
            <b-form-select
              id="per-page-select"
              v-model="perPage"
              :options="pageOptions"
              size="sm"
            ></b-form-select>
          </b-form-group>
        </b-col>

        <b-col sm="7" md="6" class="my-1">
          <b-pagination
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="perPage"
            align="fill"
            size="sm"
            class="my-0"
          ></b-pagination>
        </b-col>
      </b-row>
      <br />
      <div>
        <b-table
          striped
          hover
          :items="Students"
          :fields="fields"
          :current-page="currentPage"
          :per-page="perPage"
          :filter="filter"
          :filter-included-fields="filterOn"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          :sort-direction="sortDirection"
          stacked="md"
          show-empty
          small
          @filtered="onFiltered"
        >
          <template #cell(view_edit)="row">
            <b-button
              class="btn"
              @click="$router.push('/view-edit-gpd/' + row.item.student_ID)"
            >
              View/Edit
            </b-button>
          </template>
        </b-table>
      </div>
    </b-container>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import axios from 'axios'
const { VUE_APP_BACKEND_API } = process.env

export default {
  name: 'BrowseSearchStudent',
  data() {
    return {
      Students: [],
      fields: [
        {
          key: 'student_ID',
          label: 'Student ID',
          sortable: true
        },
        {
          key: 'name',
          label: 'Full Name',
          sortable: true
        },
        {
          key: 'graduation_semester',
          label: 'Graduation Semester',
          sortable: true
        },
        {
          key: 'number_of_semesters',
          label: 'Number of Semesters',
          sortable: true
        },
        {
          key: 'course_plan_status',
          label: 'Course Plan Status',
          sortable: false
        },
        {
          key: 'number_of_degree_requirements',
          label: 'Number of Degree Requirements',
          sortable: false
        },
        {
          key: 'view_edit',
          label: '        ',
          sortable: false
        }
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15, { value: 100, text: 'Show All' }],
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      filterOn: []
    }
  },
  computed: {
    sortOptions() {
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => {
          return { text: f.label, value: f.key }
        })
    }
  },
  methods: {
    getStudent() {
      axios
        .get(`${VUE_APP_BACKEND_API}/students`)
        .then((res) => {
          //console.log('RETRIEVE STUDENTS', res.data)
          res.data.forEach(async (item) => {
            this.Students.push({
              student_ID: item._id.sbu_id,
              name: item.firstName + ' ' + item.lastName,
              graduation_semester:
                item.graduationSem + ' ' + item.graduationYear,
              number_of_semesters: this.getSemesters(
                item.entrySem,
                item.entryYear,
                item.graduationYear
              ),
              course_plan_status: this.getCoursePlanStatus(
                this.getStudentCoursePlan(item._id.sbu_id),
                item.reqVersion.department,
                item.reqVersion.track
              ),
              number_of_degree_requirements: await this.getDegreeRequirements(
                item._id.sbu_id,
                item.reqVersion.department,
                item.reqVersion.track,
                item.reqVersion.reqSem,
                item.reqVersion.reqYear
              )
            })
          })
          this.totalRows = this.Students.length
        })
        .catch((err) => {
          console.log('RETRIEVE STUDENTS FAILED', err)
        })
    },
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    getSemesters(entrySem, entryYear, graduationYear) {
      if (graduationYear < '2021') {
        return 'Graduated'
      } else {
        return 2 * (2021 - entryYear) + (entrySem == 'Fall' ? 0 : 1)
      }
    },
    getStudentCoursePlan(studentID) {
      return axios
        .get(`${VUE_APP_BACKEND_API}/coursePlans/getCoursePlanBySbuID`, {
          params: {
            id: studentID
          }
        })
        .then((response) => response.data)
        .catch((err) => {
          console.log(err)
        })
    },
    getCoursePlanStatus(classes, department, track) {
      if (department == 'AMS') {
        return this.verifyAMS(classes, track)
      } else if (department == 'BMI') {
        return this.verifyBMI(classes, track)
      } else if (department == 'CSE') {
        return this.verifyCSE(classes, track)
      } else if (department == 'ESE') {
        return this.verifyESE(classes, track)
      }
    },
    verifyAMS(classes, track) {
      switch (track.toLowerCase()) {
        case 'computational applied mathematics':
          return 'Approved'
        case 'computational biology':
          return 'Incomplete'
        case 'operations research':
          return 'Approved'
        case 'statistics':
          return 'Approved'
        case 'quantitative finance':
          return 'Approved'
      }
    },
    verifyBMI(classes, track) {
      switch (track.toLowerCase()) {
        case 'imaging informatics with thesis':
          return 'Approved'
        case 'clinical informatics with thesis':
          return 'Incomplete'
        case 'translational bioinformatics with thesis':
          return 'Approved'
        case 'imaging informatics with project':
          return 'Approved'
        case 'clinical informatics with project':
          return 'Approved'
        case 'translational bioinformatics with project':
          return 'Approved'
      }
    },
    verifyCSE(classes, track) {
      switch (track.toLowerCase()) {
        case 'special project':
          return 'Incomplete'
        case 'advanced project':
          return 'Incomplete'
        case 'thesis':
          return 'Approved'
      }
    },
    verifyESE(classes, track) {
      switch (track.toLowerCase()) {
        case 'non-thesis':
          return 'Incomplete'
        case 'thesis':
          return 'Incomplete'
      }
    },
    getDegreeRequirements(id, department, track, sem, year) {
      if (department == 'AMS') {
        return this.degreeAMS(id, track, sem, year)
      } else if (department == 'BMI') {
        return this.degreeBMI(id, track, sem, year)
      } else if (department == 'CSE') {
        return this.degreeCSE(id, track, sem, year)
      } else if (department == 'ESE') {
        return this.degreeESE(id, track, sem, year)
      }
    },
    getRequirementsByDepartment(dept, sem, year) {
      return axios
        .get(`${VUE_APP_BACKEND_API}/requirements/getreq`, {
          params: {
            department: dept,
            reqSem: sem,
            reqYear: year
          }
        })
        .then((response) => response.data)
        .catch((err) => {
          console.log(err)
        })
    },
    calculateGrade(grade, credits) {
      switch (grade) {
        case 'A':
          return 4.00 * credits
        case 'A-':
          return 3.67 * credits
        case 'B+':
          return 3.33 * credits
        case 'B':
          return 3.00 * credits
        case 'B-':
          return 2.67 * credits
        case 'C+':
          return 2.33 * credits
        case 'C':
          return 2.00 * credits
        case 'C-':
          return 1.67 * credits
        case 'D+':
          return 1.33 * credits
        case 'D':
          return 1.00 * credits
        case 'D-':
          return 0.67 * credits
        case 'F':
          return 0.00
      }
    },
    getDegreeCompletion(studentCourses, coreCourses, mandatoryCourse, electiveCourses, electiveCourse, gpaReq, creditReq, totalReq) {
      let [satisfied,pending,unsatisfied,gpaCredits,currentCredits,currentGpa] = [0,0,0,0,0,0]
      studentCourses.forEach((value) => {        
        // Completed class
        if (value.grade != "") {
          if ((mandatoryCourse.includes(value.department + " " + value.course_num) || electiveCourse.includes(value.department + " " + value.course_num))) {
            satisfied++
            let classCredits = 3
            if (mandatoryCourse.includes(value.department + " " + value.course_num)) {
              coreCourses.forEach((course) => {
                if (course.department == value.department && course.course_num == value.course_num) {
                  classCredits = course.credits
                }
              })
            }
            else if (electiveCourse.includes(value.department + " " + value.course_num)) {
              electiveCourses.forEach((course) => {
                if (course.department == value.department && course.course_num == value.course_num) {
                  classCredits = course.credits
                }
              })
            }
            gpaCredits += classCredits
            currentCredits += classCredits
            currentGpa += this.calculateGrade(value.grade, classCredits)
          }
        }
        // Pending class
        else if ((mandatoryCourse.includes(value.department + " " + value.course_num) || electiveCourse.includes(value.department + " " + value.course_num)) && value.grade == "") {
          pending++
          let classCredits = 3
          if (mandatoryCourse.includes(value.department + " " + value.course_num)) {
            coreCourses.forEach((course) => {
              if (course.department == value.department && course.course_num == value.course_num) {
                classCredits = course.credits
              }
            })
          }
          else if (electiveCourse.includes(value.department + " " + value.course_num)) {
            electiveCourses.forEach((course) => {
              if (course.department == value.department && course.course_num == value.course_num) {
                classCredits = course.credits
              }
            })
          }
          currentCredits += classCredits
        }
      })
      // console.log("total gpa", currentGpa)
      currentGpa /= gpaCredits
      if (currentGpa >= gpaReq) {
        satisfied++
      }
      if (currentCredits >= creditReq) {
        satisfied++
      }
      console.log("GPA Credits", gpaCredits)
      console.log("CurrentCredits", currentCredits)
      console.log("GPA", currentGpa)
      console.log("Total Req", totalReq)
      unsatisfied = totalReq - satisfied - pending
      return `${satisfied} satisfied, ${pending} pending, ${unsatisfied} unsatisfied`
      // return `${satisfied} satisfied, ${pending} pending, ${unsatisfied} unsatisfied,
      // ${gpaCredits} gpaCredits, ${currentCredits} currentCredits, ${currentGpa} currentGpa`
    },
    async degreeAMS(id, track, sem, year) {
      let studentCourses = await this.getStudentCoursePlan(id)
      let reqAMS = await this.getRequirementsByDepartment('AMS', sem, year)
      let creditReq = reqAMS.requirements.min_credit
      let gpaReq = reqAMS.requirements.cum_course_gpa

      switch (track.toLowerCase()) {
        case 'computational applied mathematics': {
          let coreCourses = reqAMS.requirements.track_req.tracks[0].courses
          let mandatoryCourse = coreCourses.map(
            (coursePlan) => coursePlan.department + ' ' + coursePlan.course_num
          )
          let electiveCourses = reqAMS.requirements.track_req.tracks[0].elective_courses
          let electiveCourse = electiveCourses.map(
            (coursePlan) => coursePlan.department + ' ' + coursePlan.course_num
          )
          let minElectives = reqAMS.requirements.track_req.tracks[0].number_of_elective_course
          let totalReq = (coreCourses.length + minElectives + 2)
          return this.getDegreeCompletion(studentCourses, coreCourses, mandatoryCourse, electiveCourses, electiveCourse, gpaReq, creditReq, totalReq)
        }
        case 'computational biology': {
          let coreCourses = reqAMS.requirements.track_req.tracks[1].courses
          let mandatoryCourse = coreCourses.map(
            (coursePlan) => coursePlan.department + ' ' + coursePlan.course_num
          )
          let electiveCourses = reqAMS.requirements.track_req.tracks[1].elective_courses
          let electiveCourse = electiveCourses.map(
            (coursePlan) => coursePlan.department + ' ' + coursePlan.course_num
          )
          let minElectives = reqAMS.requirements.track_req.tracks[1].number_of_elective_course
          let totalReq = (coreCourses.length + minElectives + 2)
          return this.getDegreeCompletion(studentCourses, coreCourses, mandatoryCourse, electiveCourses, electiveCourse, gpaReq, creditReq, totalReq)
        }
        case 'operations research': {
          let coreCourses = reqAMS.requirements.track_req.tracks[2].courses
          let mandatoryCourse = coreCourses.map(
            (coursePlan) => coursePlan.department + ' ' + coursePlan.course_num
          )
          let electiveCourses = reqAMS.requirements.track_req.tracks[2].elective_courses
          let electiveCourse = electiveCourses.map(
            (coursePlan) => coursePlan.department + ' ' + coursePlan.course_num
          )
          let minElectives = reqAMS.requirements.track_req.tracks[2].number_of_elective_course
          let totalReq = (coreCourses.length + minElectives + 2)
          return this.getDegreeCompletion(studentCourses, coreCourses, mandatoryCourse, electiveCourses, electiveCourse, gpaReq, creditReq, totalReq)
        }
        case 'statistics': {
          let coreCourses = reqAMS.requirements.track_req.tracks[3].courses
          let mandatoryCourse = coreCourses.map(
            (coursePlan) => coursePlan.department + ' ' + coursePlan.course_num
          )
          let electiveCourses = reqAMS.requirements.track_req.tracks[3].elective_courses
          let electiveCourse = electiveCourses.map(
            (coursePlan) => coursePlan.department + ' ' + coursePlan.course_num
          )
          let minElectives = reqAMS.requirements.track_req.tracks[3].number_of_elective_course
          let totalReq = (coreCourses.length + minElectives + 2)
          return this.getDegreeCompletion(studentCourses, coreCourses, mandatoryCourse, electiveCourses, electiveCourse, gpaReq, creditReq, totalReq)
        }
        case 'quantitative finance': {
          let coreCourses = reqAMS.requirements.track_req.tracks[4].courses
          let mandatoryCourse = coreCourses.map(
            (coursePlan) => coursePlan.department + ' ' + coursePlan.course_num
          )
          let electiveCourses = reqAMS.requirements.track_req.tracks[4].elective_courses
          let electiveCourse = electiveCourses.map(
            (coursePlan) => coursePlan.department + ' ' + coursePlan.course_num
          )
          let minElectives = reqAMS.requirements.track_req.tracks[4].number_of_elective_course
          let totalReq = (coreCourses.length + minElectives + 2)
          return this.getDegreeCompletion(studentCourses, coreCourses, mandatoryCourse, electiveCourses, electiveCourse, gpaReq, creditReq, totalReq)
        }
      }
    },
    degreeBMI(classes, track) {
      switch (track.toLowerCase()) {
        case 'imaging informatics with thesis':
          return '3 satisfied, 1 pending, 2 unsatisfied'
        case 'clinical informatics with thesis':
          return '3 satisfied, 1 pending, 2 unsatisfied'
        case 'translational bioinformatics with thesis':
          return '3 satisfied, 1 pending, 2 unsatisfied'
        case 'imaging informatics with project':
          return '3 satisfied, 1 pending, 2 unsatisfied'
        case 'clinical informatics with project':
          return '3 satisfied, 1 pending, 2 unsatisfied'
        case 'translational bioinformatics with project':
          return '3 satisfied, 1 pending, 2 unsatisfied'
      }
    },
    degreeCSE(classes, track) {
      switch (track.toLowerCase()) {
        case 'special project':
          return '3 satisfied, 1 pending, 2 unsatisfied'
        case 'advanced project':
          return '3 satisfied, 1 pending, 2 unsatisfied'
        case 'thesis':
          return '3 satisfied, 1 pending, 2 unsatisfied'
      }
    },
    degreeESE(classes, track) {
      switch (track.toLowerCase()) {
        case 'non-thesis':
          return '3 satisfied, 1 pending, 2 unsatisfied'
        case 'thesis':
          return '3 satisfied, 1 pending, 2 unsatisfied'
      }
    }
  },
  mounted() {
    this.getStudent()
  },
  components: {
    NavBar
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h2 {
  font-weight: bold;
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
  color: #42b983;
}
.radioLeft {
  text-align: left;
}
.btn {
  padding: 5px 15px;
  border-radius: 10px;
  background-color: #a30e0e;
  float: right;
  color: white;
}
.btn:hover {
  background-color: #800000;
}
.tdbg {
  background-color: #a30e0e !important;
}
</style>
