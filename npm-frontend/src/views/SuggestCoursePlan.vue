<template>
  <div class="suggest-course-plan">
    <NavBar />
    <br />
    <br />

    <b-container>
      <b-row>
        <b-col cols="10">
          <b-row>
            <b-col>
              <b-form-group
                id="maxCourseID"
                label-cols-sm="3"
                content-cols-sm="2"
                label="Maximum course per semester"
                label-for="maxCourse"
              >
                <b-form-input id="maxCourse" v-model="maxCourse"></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-form-group
                id="preferCoursesID"
                label-cols-sm="3"
                content-cols-sm="9"
                label="Preferred Courses"
              >
                <b-form-tags
                  v-model="valuePreferedCourses"
                  no-outer-focus
                  no-add-on-enter
                  class="mb-2"
                  :tag-validator="validatorCourse"
                >
                  <template
                    v-slot="{
                      tags,
                      inputAttrs,
                      inputHandlers,
                      addTag,
                      removeTag
                    }"
                  >
                    <b-input-group aria-controls="my-custom-tags-list">
                      <input
                        v-bind="inputAttrs"
                        v-on="inputHandlers"
                        placeholder="Course Name - i.e. CSE 512"
                        class="form-control"
                      />
                      <b-input-group-append>
                        <b-input-group>
                          <b-form-select
                            v-model="selectedStrength"
                            :options="optionsStrength"
                          ></b-form-select>
                          <b-input-group-append>
                            <b-button
                              @click="addTagWrapperCourse(addTag, inputAttrs)"
                              :style="myStyle"
                            >
                              Add
                            </b-button>
                          </b-input-group-append>
                        </b-input-group>
                      </b-input-group-append>
                    </b-input-group>
                    <ul
                      id="my-custom-tags-list"
                      class="list-unstyled d-inline-flex flex-wrap mb-0"
                      aria-live="polite"
                      aria-atomic="false"
                      aria-relevant="additions removals"
                    >
                      <b-card
                        v-for="tag in tags"
                        :key="tag"
                        :id="`my-custom-tags-tag_${tag.replace(/\s/g, '_')}_`"
                        tag="li"
                        class="mt-1 mr-1"
                        body-class="py-1 pr-2 text-nowrap"
                      >
                        <strong>{{ tag }}</strong>
                        <b-button
                          @click="removeTagWrapperCourse(removeTag, tag)"
                          variant="link"
                          size="sm"
                          :aria-controls="
                            `my-custom-tags-tag_${tag.replace(/\s/g, '_')}_`
                          "
                        >
                          remove
                        </b-button>
                      </b-card>
                    </ul>
                  </template>
                </b-form-tags>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-form-group
                id="avoidCoursesID"
                label-cols-sm="3"
                content-cols-sm="9"
                label="Courses to avoid"
              >
                <b-form-tags
                  v-model="valueAvoidCourses"
                  no-outer-focus
                  no-add-on-enter
                  class="mb-2"
                  :tag-validator="validatorCourse"
                >
                  <template
                    v-slot="{
                      tags,
                      inputAttrs,
                      inputHandlers,
                      addTag,
                      removeTag
                    }"
                  >
                    <b-input-group aria-controls="my-custom-tags-list">
                      <input
                        v-bind="inputAttrs"
                        v-on="inputHandlers"
                        placeholder="Course Name - i.e. CSE 512"
                        class="form-control"
                      />
                      <b-input-group-append>
                        <b-button
                          @click="addTagWrapperAvoid(addTag)"
                          :style="myStyle"
                        >
                          Add
                        </b-button>
                      </b-input-group-append>
                    </b-input-group>
                    <ul
                      id="my-custom-tags-list"
                      class="list-unstyled d-inline-flex flex-wrap mb-0"
                      aria-live="polite"
                      aria-atomic="false"
                      aria-relevant="additions removals"
                    >
                      <b-card
                        v-for="tag in tags"
                        :key="tag"
                        :id="`my-custom-tags-tag_${tag.replace(/\s/g, '_')}_`"
                        tag="li"
                        class="mt-1 mr-1"
                        body-class="py-1 pr-2 text-nowrap"
                      >
                        <strong>{{ tag }}</strong>
                        <b-button
                          @click="removeTagWrapperAvoid(removeTag, tag)"
                          variant="link"
                          size="sm"
                          :aria-controls="
                            `my-custom-tags-tag_${tag.replace(/\s/g, '_')}_`
                          "
                        >
                          remove
                        </b-button>
                      </b-card>
                    </ul>
                  </template>
                </b-form-tags>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-form-group
                id="timeID"
                label-cols-sm="3"
                content-cols-sm="9"
                label="Preferred Time"
              >
                <b-row>
                  <b-col>
                    <b-form-group
                      id="timeID"
                      label-cols-sm="3"
                      content-cols-sm="9"
                      label="From"
                    >
                      <b-form-timepicker
                        id="from_time"
                        v-model="fromTime"
                        locale="en"
                        placeholder="From"
                      ></b-form-timepicker>
                    </b-form-group>
                  </b-col>
                  <b-col>
                    <b-form-group
                      id="timeID"
                      label-cols-sm="3"
                      content-cols-sm="9"
                      label="To"
                    >
                      <b-form-timepicker
                        id="toTime"
                        v-model="toTime"
                        locale="en"
                      ></b-form-timepicker>
                    </b-form-group>
                  </b-col>
                </b-row>
              </b-form-group>
            </b-col>
          </b-row>
        </b-col>
        <b-col cols="2" align-self="end">
          <b-button-group vertical>
            <div>
              <b-button block :style="myStyle" size="sm" @click="smartSuggest">
                Smart suggestion
              </b-button>
            </div>
            <div class="mt-2">
              <b-button block :style="myStyle" size="sm" @click="applyFilter">
                Apply Filter
              </b-button>
            </div>
          </b-button-group>
        </b-col>
      </b-row>

      <b-row
        v-for="(column, index1) in suggestedPlanColumns"
        :key="index1"
        class="mt-3"
      >
        <b-col v-for="(plan, index2) in column" :key="index2" class="mt-3">
          <SuggestedPlan
            :plan="plan"
            :index="index1 * 2 + index2"
            :selectedPlan="selectedPlan"
          />
        </b-col>
      </b-row>
      <b-row
        v-for="(column, index1) in applyFilterPlanColumns"
        :key="index1"
        class="mt-3"
      >
        <b-col v-for="(plan, index2) in column" :key="index2" class="mt-3">
          <SuggestedPlan
            :plan="plan"
            :index="index1 * 2 + index2"
            :selectedPlan="selectedPlan"
          />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import SuggestedPlan from '@/components/SuggestedPlan.vue'
import Vue from 'vue'
import axios from 'axios'
const { VUE_APP_BACKEND_API } = process.env

export default {
  name: 'SuggestCoursePlan',
  components: {
    NavBar,
    SuggestedPlan
  },
  data() {
    return {
      //studentID: this.$route.params.studentID,
      studentID: '987654321',
      maxCourse: '',
      selectedStrength: null,
      valuePreferedCourses: [],
      preferedCourseDict: {},
      optionsStrength: [
        { value: null, text: 'Please select preference strength' },
        { value: 'High', text: 'High' },
        { value: 'Medium', text: 'Medium' },
        { value: 'Low', text: 'Low' }
      ],
      valueAvoidCourses: [],
      fromTime: '00:00:00',
      toTime: '23:59:00',
      smartSuggestPlans: [
        [
          {
            semester: '1',
            courses: ['CSE 416', 'CSE 216', 'CSE 316'],
            credits: [3, 3, 3]
          },
          {
            semester: '2',
            courses: ['CSE 214', 'CSE 114', 'CSE 101'],
            credits: [3, 3, 3]
          },
          {
            semester: '3',
            courses: ['CSE 323', 'CSE 332', 'CSE 334'],
            credits: [3, 3, 3]
          }
        ],
        [
          {
            semester: '1',
            courses: ['CSE 416', 'CSE 216', 'CSE 316'],
            credits: [3, 3, 3]
          },
          {
            semester: '2',
            courses: ['CSE 214', 'CSE 114', 'CSE 101'],
            credits: [3, 3, 3]
          },
          {
            semester: '3',
            courses: ['CSE 323', 'CSE 332', 'CSE 334'],
            credits: [3, 3, 3]
          }
        ],
        [
          {
            semester: '1',
            courses: ['CSE 416', 'CSE 216', 'CSE 316'],
            credits: [3, 3, 3]
          },
          {
            semester: '2',
            courses: ['CSE 214', 'CSE 114', 'CSE 101'],
            credits: [3, 3, 3]
          },
          {
            semester: '3',
            courses: ['CSE 323', 'CSE 332', 'CSE 334'],
            credits: [3, 3, 3]
          }
        ],
        [
          {
            semester: '1',
            courses: ['CSE 512', 'CSE 535', 'CSE 316'],
            credits: [3, 3, 3]
          },
          {
            semester: '2',
            courses: ['CSE 545', 'CSE 114', 'CSE 101'],
            credits: [3, 3, 3]
          },
          {
            semester: '3',
            courses: ['CSE 544', 'CSE 332', 'CSE 334'],
            credits: [3, 3, 3]
          }
        ]
      ],
      applyFilterPlans: [],
      myStyle: {
        backgroundColor: '#800000',
        color: 'white',
        textAlign: 'center'
      }
    }
  },
  methods: {
    validatorCourse(tag) {
      // Individual tag validator function

      return tag.trim().search('^[A-Z]{3} [1-9]{1}[0-9]{2}$') === 0
    },
    addTagWrapperCourse(addTag, inputAttrs) {
      addTag()
      this.preferedCourseDict[inputAttrs.value] = this.selectedStrength
    },
    removeTagWrapperCourse(removeTag, tag) {
      removeTag(tag)
      Vue.delete(this.preferedCourseDict, tag)
    },

    addTagWrapperAvoid(addTag) {
      addTag()
    },
    removeTagWrapperAvoid(removeTag, tag) {
      removeTag(tag)
    },
    getStudent() {
      return axios
        .get(`${VUE_APP_BACKEND_API}/students/getOneByID`, {
          params: {
            id: this.studentID
          }
        })
        .then(response => response.data)
        .catch(err => {
          console.log(err)
        })
    },
    getCourseByDepartment(dept_name) {
      return axios
        .get(`${VUE_APP_BACKEND_API}/courses/getCourseByDepartment`, {
          params: {
            department: dept_name
          }
        })
        .then(response => response.data)
        .catch(err => {
          console.log(err)
        })
    },
    getStudentCoursePlan() {
      return axios
        .get(`${VUE_APP_BACKEND_API}/coursePlans/getCorsePlanBySbuID`, {
          params: {
            id: this.studentID
          }
        })
        .then(response => response.data)
        .catch(err => {
          console.log(err)
        })
    },
    getCourseByNameNumber(courseName, courseNum) {
      return axios
        .get(`${VUE_APP_BACKEND_API}/courses/getCourseByNameNumber`, {
          params: {
            name: courseName,
            number: courseNum
          }
        })
        .then(response => response.data)
        .catch(err => {
          console.log(err)
        })
    },
    async smartSuggest() {
      //
    },
    async applyFilter() {
      // use student id to get student info.
      let student = await this.getStudent()
      // get all courses from the students department. ->  using students Department, get all courses in that dept.
      let coursesInDepartment = await this.getCourseByDepartment(
        student.reqVersion.department
      )

      // get all courses that have been taken by the student. -> use student ID to get all course Plan related to this student.
      let studentCoursePlans = await this.getStudentCoursePlan()

      // remove all courses that exist in the course plan already.
      let modifiedCoursePlan = studentCoursePlans.map(
        coursePlan => coursePlan.department + ' ' + coursePlan.course_num
      )
      let eligibleCoursesInDepartment = coursesInDepartment.filter(
        course =>
          modifiedCoursePlan.indexOf(
            course.course_name + ' ' + course.course_num
          ) === -1
      )

      // for each preferred course, add all of its prerequisite courses in the main list with high preference. (Remember to do it recursively)
      // at the end of this BFS, we will end of with a complete list of eligibleCoursesInDepartment list.
      let preferenceDict = this.preferedCourseDict // This will hold all the preferred courses at the end of this BFS search
      let eligibleCourseNames = eligibleCoursesInDepartment.map(
        // This will hold all the eligible course names at the end of this BFS search
        course => course.course_name + ' ' + course.course_num
      )

      var q = []
      for (let prefCourse of this.valuePreferedCourses) {
        let newCourse = null
        if (eligibleCourseNames.indexOf(prefCourse) === -1) {
          // if course not exist in the dept list, do a axios request to get actual course object from the database
          let name = prefCourse.split(' ')[0]
          let number = prefCourse.split(' ')[1]
          newCourse = await this.getCourseByNameNumber(name, number)
          eligibleCourseNames.push(prefCourse) // add this in our main list of eligible courses.
          eligibleCoursesInDepartment.push(newCourse)
        } else {
          newCourse =
            eligibleCoursesInDepartment[eligibleCourseNames.indexOf(prefCourse)]
        }

        q.push(newCourse)
      }

      let allPrefCourseNames = []
      while (q.length != 0) {
        var prefCourse = q.shift() // visit this node
        var tmpCourseName = prefCourse.course_name + ' ' + prefCourse.course_num
        allPrefCourseNames.push(tmpCourseName) // adding to the visited nodes list
        preferenceDict[tmpCourseName] = !(
          tmpCourseName in this.preferedCourseDict
        )
          ? 'High-Prereq'
          : this.preferedCourseDict[tmpCourseName]

        for (let prereqCourse of prefCourse.prerequisites) {
          if (allPrefCourseNames.indexOf(prereqCourse) === -1) {
            // if not visited, visit this.
            let newCourse = null
            if (eligibleCourseNames.indexOf(prereqCourse) === -1) {
              // if course not exist in the dept list, do a axios request to get actual course object from the database
              let name = prereqCourse.split(' ')[0]
              let number = prereqCourse.split(' ')[1]
              newCourse = await this.getCourseByNameNumber(name, number)
              eligibleCourseNames.push(prereqCourse) // add this in our main list of eligible courses.
              eligibleCoursesInDepartment.push(newCourse)
            } else {
              newCourse =
                eligibleCoursesInDepartment[
                  eligibleCourseNames.indexOf(prereqCourse)
                ]
            }
            q.push(newCourse) // add this node to visit
          }
        }
      }
      // create a directed graph of courses and their prerequisites. (we have all courses that we need. we can now make the graph). a -> b = course b has prerequisite of course a
      let graph = new Map()
      for (let courseName of eligibleCourseNames) {
        // initialize the nodes with empty arrays
        graph.set(courseName, { incomingEdgeCount: 0, neighbors: [] })
      }
      for (let course of eligibleCoursesInDepartment) {
        let nodeBname = course.course_name + ' ' + course.course_num
        for (let prereq of course.prerequisites) {
          let nodeAname = prereq // taking course nodeAname will fulfill prerequisite of nodeBname.
          graph.get(nodeAname).neighbors.push(nodeBname) // adding edge a -> b
          graph.get(nodeBname).incomingEdgeCount += 1 // increment IncomingEdgeCount for node b
        }
      }
      // for each course that are asked to avoid, remove them plus remove courses that have this course as prerequisite. (remember to do it recursively so all following courses are removed)
      let avoidCourseNames = this.valueAvoidCourses
      q = []
      for (let avoidCourse of avoidCourseNames) {
        q.push(avoidCourse)
      }
      while (q.length != 0) {
        let avoidCourse = q.shift() // get the current course in the queue
        for (let neighborCourse of graph.get(avoidCourse)) {
          // put all courses that depend on thsis course in the queue to be removed later.
          q.push(neighborCourse)
        }
        graph.delete(avoidCourse) // remove this course from the graph
      }

      // BEGIN TOPOLOGICAL SORT -> toposort should return a list of plans, each plan will contain a list of Semester objects.
      let allPlans = this.topoSort(
        graph,
        preferenceDict,
        eligibleCoursesInDepartment
      )
      console.log(allPlans)
      //this.applyFilterPlans = allPlans
    },
    // topoSort should return a list of plans, each plan will contain a list of Semester objects.
    // remember that always taking the high prefered course is not good, since we might end up taking all prereq courses and not take the actual course.
    // while choosing courses for each semester, remember to remove courses that doesnt meet time constraint. It can not be done ahead of sort, bcz semester info is unknown beforehand
    topoSort(graph, preferenceDict, eligibleCoursesInDepartment) {
      // maxCoursePerSemester, PreferredStartTime, preferredEndTime
      console.log(graph)
      console.log(preferenceDict)
      console.log(eligibleCoursesInDepartment)

      let semesterCreated = false
      while (semesterCreated) {
        // collect All courses that have incomindEdgeCount === 0 && not already taken
        // sort these courses based on their preference strength
        // pick N classes if they are offered and have no time conflict and fulfills a degree requirement // Break out and add current semseter, if degree requirement is full.
        // if no classes was picked, set semesterCreated to be false
        // add these classes as a semester in the plan
        // for all these added class -> remove them from the graph, decreaseIncomingEdge counts of their neighbors
      }

      // if degree requirement is not complete, return no plan.
      // else return the plan
    },
    selectedPlan() {
      // clear all inputs and datas
      this.maxCourse = ''
      this.selectedStrength = null
      this.valuePreferedCourses = []
      this.preferedCourseDict = {}
      this.valueAvoidCourses = []
      this.fromTime = '00:00:00'
      this.toTime = '23:59:00'
      this.smartSuggestPlans = []
      this.applyFilterPlans = []
    }
  },

  computed: {
    suggestedPlanColumns() {
      let columns = []
      let first = []
      let second = []
      for (let i = 0; i < this.smartSuggestPlans.length; i++) {
        if (i % 2 === 0) first.push(this.smartSuggestPlans[i])
        else second.push(this.smartSuggestPlans[i])
      }
      columns.push(first)
      columns.push(second)
      return columns
    },
    applyFilterPlanColumns() {
      let columns = []
      let first = []
      let second = []
      for (let i = 0; i < this.applyFilterPlans.length; i++) {
        if (i % 2 === 0) first.push(this.applyFilterPlans[i])
        else second.push(this.applyFilterPlans[i])
      }
      columns.push(first)
      columns.push(second)
      return columns
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
