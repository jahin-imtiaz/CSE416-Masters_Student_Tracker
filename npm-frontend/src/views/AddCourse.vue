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
      <p v-for="item in selected" v-bind:key="item">{{ item.course }}</p>
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
      courses: [],
      selected: [],
      fields: ['course', 'description'],
      selectMode: 'multi',
      form: {
        search: '',
        filter: ''
      },
      filters: ['All Fields', 'Department', 'Course Number'],
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
        .get(`${VUE_APP_BACKEND_API}/courseofferings/findAllOfferingOfCourses`)
        .then((response) => {
          console.log(response.data)
          for (let i = 0; i < response.data.length; i++) {
            let newCourse = {}
            newCourse.course =
              response.data[i]['courseID']['department'] +
              ' ' +
              response.data[i]['courseID']['course_num']
            newCourse.description = response.data[i]['courseID']['description']
          }
          if (this.form.search != '' && this.form.filter == 'Course Number') {
            vm.courses = []
            let filtered = response.data.filter((course) => {
              return course['courseID']['course_num'].includes(this.form.search)
            })
            console.log(filtered)
            for (let i = 0; i < filtered.length; i++) {
              let newCourse = {}
              newCourse.course =
                filtered[i]['courseID']['department'] +
                ' ' +
                filtered[i]['courseID']['course_num'] +
                ' ' +
                filtered[i]['courseID']['course_name']

              newCourse.description =
                filtered[i]['courseID']['description'] +
                '\n Semester: ' +
                filtered[i]['semester'] +
                '   Year: ' +
                filtered[i]['year']
              newCourse.semester = filtered[i]['semester']
              newCourse.year = filtered[i]['year']
              vm.courses.push(newCourse)
            }
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
        let semester = this.selected[i].semester
        let year = this.selected[i].year
        console.log(department)
        console.log(courseNum)
        let newCoursePlan = {
          sbu_id: this.$route.params.studentID,
          course_num: courseNum,
          department: department,
          semester: semester,
          year: year
        }
        coursesToAdd.push(newCoursePlan)
      }

      axios
        .post(`${VUE_APP_BACKEND_API}/courseplans/add-many`, coursesToAdd)
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
