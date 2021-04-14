<template>
  <div class="add-course">
    <NavBar />
    <br />
    <br />
    Add Course
    <br />
    <br />
    <b-form @submit="onSubmit">
      <b-container>
        <b-row>
          <b-col>
            <b-form-group
              id="input-group-2"
              label-cols-sm="4"
              content-cols-sm="8"
              label="Search: "
              label-for="search"
            >
              <b-form-input
                id="search"
                v-model="form.search"
                placeholder="Search..."
              />
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group
              id="filter"
              label="Filter: "
              label-for="filter"
              label-cols-sm="4"
              content-cols-sm="8"
            >
              <b-form-select
                id="filter"
                v-model="form.filter"
                :options="filters"
              ></b-form-select>
            </b-form-group>
          </b-col>
          <b-col>
            <b-button :style="myStyle" type="submit">Find</b-button>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-form-group
              id="input-group-3"
              label-cols-sm="4"
              content-cols-sm="8"
              label="Select Semester:"
              label-for="input-3"
            >
              <b-form-select
                id="input-3"
                v-model="form.semester"
                :options="semesters"
              ></b-form-select>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group
              id="input-group-3"
              label-cols-sm="4"
              content-cols-sm="8"
              label="Select Year:"
              label-for="input-3"
            >
              <b-form-select
                id="input-3"
                v-model="form.year"
                :options="years"
              ></b-form-select>
            </b-form-group>
          </b-col>
        </b-row>
      </b-container>
    </b-form>

    <br />
    <br />

    <div>
      <b-table
        hover
        :select-mode="selectMode"
        selectable
        @row-selected="onRowSelected"
        ref="selectableTable"
        :items="courses"
        :fields="fields"
      >
        <template #cell(selected)="{ rowSelected }">
          <template v-if="rowSelected">
            <span aria-hidden="true">&check;</span>
            <span class="sr-only">Selected</span>
          </template>
          <template v-else>
            <span aria-hidden="true">&nbsp;</span>
            <span class="sr-only">Not selected</span>
          </template>
        </template>
      </b-table>
    </div>
    <div>
      <b>Selected Courses:</b>
      {{ selected }}
      <div>
        <b-button :style="myStyle" size="sm" @click="addCourses">
          Add Courses
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import axios from 'axios'
const { VUE_APP_BACKEND_API } = process.env

export default {
  name: 'AddCourse',
  props: {
    msg: String
  },
  components: {
    NavBar
  },
  data() {
    return {
      myStyle: {
        backgroundColor: '#800000',
        color: 'white',
        textAlign: 'center'
      },
      semesters: ['Spring', 'Fall'],
      years: ['2018', '2019', '2020', '2021'],
      courses: [],
      selected: [],
      fields: ['course', 'description'],
      selectMode: 'multi',
      form: {
        search: '',
        filter: null,
        year: '',
        semester: ''
      },
      filters: [{ text: 'All Fields' }, 'Department', 'Course Number'],
      tableItems: this.courses
    }
  },
  methods: {
    onRowSelected(items) {
      this.selected = items
    },
    onSubmit(event) {
      event.preventDefault()
      let vm = this
      axios
        .get(
          `${VUE_APP_BACKEND_API}/courseofferings/findAllOfferingOfCourse/`,
          {
            params: {
              name: this.form.search,
              semester: this.form.semester,
              year: this.form.year
            }
          }
        )
        .then((response) => {
          console.log(response.data)
          for (let i = 0; i < response.data.length; i++) {
            let newCourse = {}
            newCourse.course =
              response.data[i]['courseID']['course_name'] +
              ' ' +
              response.data[i]['courseID']['course_num']
            newCourse.description = response.data[i]['courseID']['description']

            vm.courses.push(newCourse)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    addCourses() {
      let coursesToAdd = []
      for (let i = 0; i < this.selected.length; i++) {
        let department = this.selected[i].course.split(' ')[0]
        let courseNum = this.selected[i].course.split(' ')[1]
        console.log(department)
        console.log(courseNum)
        let newCoursePlan = {
          sbu_id: this.$store.state.studentID,
          course_num: courseNum,
          department: department
        }
        coursesToAdd.push(newCoursePlan)
      }

      axios
        .post(`${VUE_APP_BACKEND_API}/courseplans/add-many`, { coursesToAdd })
        .then(function (response) {
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
    }
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
