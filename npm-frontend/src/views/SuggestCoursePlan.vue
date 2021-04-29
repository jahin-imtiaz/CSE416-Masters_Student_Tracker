<template>
  <div class="suggest-course-plan">
    <NavBar />
    <br />
    <br />

    <b-container>
      <b-row>
        <b-col cols="10">
          <b-row>
            <b-col cols="6">
              <b-form-group
                id="maxCourseID"
                label-cols-sm="6"
                content-cols-sm="6"
                label="Maximum course per semester"
                label-for="maxCourse"
              >
                <b-form-input id="maxCourse" v-model="maxCourse"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col cols="3">
              <b-form-group
                id="semesterID"
                label-cols-sm="4"
                content-cols-sm="8"
                label="Semester"
              >
                <b-form-select
                  v-model="currentSem"
                  :options="optionsSemester"
                ></b-form-select>
              </b-form-group>
            </b-col>
            <b-col cols="3">
              <b-form-group
                id="yearID"
                label-cols-sm="4"
                content-cols-sm="8"
                label="Year"
              >
                <b-form-select
                  v-model="currentYear"
                  :options="optionsYear"
                ></b-form-select>
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
                          :aria-controls="`my-custom-tags-tag_${tag.replace(
                            /\s/g,
                            '_'
                          )}_`"
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
                          :aria-controls="`my-custom-tags-tag_${tag.replace(
                            /\s/g,
                            '_'
                          )}_`"
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
//import _ from 'lodash'
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
      currentSem: 'Spring',
      currentYear: 2021,
      optionsSemester: [
        { value: null, text: 'Please select current semester' },
        { value: 'Fall', text: 'Fall' },
        { value: 'Winter', text: 'Winter' },
        { value: 'Spring', text: 'Spring' },
        { value: 'SummerI', text: 'SummerI' },
        { value: 'SummerII', text: 'SummerII' }
      ],
      optionsYear: [
        { value: null, text: 'Please select current Year' },
        { value: 2018, text: '2018' },
        { value: 2019, text: '2019' },
        { value: 2020, text: '2020' },
        { value: 2021, text: '2021' },
        { value: 2022, text: '2022' },
        { value: 2023, text: '2023' },
        { value: 2024, text: '2024' },
        { value: 2025, text: '2025' },
        { value: 2026, text: '2026' },
        { value: 2027, text: '2027' }
      ],
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
        .then((response) => response.data)
        .catch((err) => {
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
        .then((response) => response.data)
        .catch((err) => {
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
        .then((response) => response.data)
        .catch((err) => {
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
        .then((response) => response.data)
        .catch((err) => {
          console.log(err)
        })
    },
    async smartSuggest() {
      // TODO
    },
    calculatedSemesterAndYear(currentSem, currentYear, semesterCount) {
      let semesterNames = ['Fall', 'Winter', 'Spring', 'SummerI', 'SummerII']
      let retObj = {}
      retObj['year'] = currentYear + semesterCount / semesterNames.length
      retObj['sem'] =
        semesterNames[
          semesterNames.indexOf(currentSem) +
            (semesterCount % semesterNames.length)
        ]
      return retObj
    },
    async getAllCourseOfferingForCourse(courseName, semester, year) {
      return axios
        .get(`${VUE_APP_BACKEND_API}/courseofferings/findAllOfferingOfCourse`, {
          params: {
            name: courseName,
            semester: semester,
            year: year
          }
        })
        .then((response) => response.data)
        .catch((err) => {
          console.log(err)
        })
    },
    async isClassOfferedAndTimeConstraintMeet(courseName, semester, year) {
      // TODO
      let offeredCourseList = await this.getAllCourseOfferingForCourse(
        courseName,
        semester,
        year
      )
      if (offeredCourseList.length === 0) return false

      let fromTimeHour = parseInt(this.fromTime.split(':')[0])
      let fromTimeMinute =
        parseInt(this.fromTime.split(':')[1]) + fromTimeHour * 60

      let toTimeHour = parseInt(this.toTime.split(':')[0])
      let toTimeMinute = parseInt(this.toTime.split(':')[1]) + toTimeHour * 60

      for (let courseOffer of offeredCourseList) {
        let courseStartHour = parseInt(courseOffer.start_time.split(':')[0])
        let courseStartMinute = parseInt(
          courseOffer.start_time.split(':')[1].slice(0, 2)
        )
        let courseStartAmPm = courseOffer.start_time.split(':')[1].slice(2)
        if (courseStartAmPm === 'AM') {
          if (courseStartHour === 12) courseStartHour = 0
        } else {
          courseStartHour += 12
        }
        courseStartMinute = courseStartMinute + courseStartHour * 60

        let courseEndHour = parseInt(courseOffer.end_time.split(':')[0])
        let courseEndMinute = parseInt(
          courseOffer.end_time.split(':')[1].slice(0, 2)
        )
        let courseEndAmPm = courseOffer.end_time.split(':')[1].slice(2)
        if (courseEndAmPm === 'AM') {
          if (courseEndHour === 12) courseEndHour = 0
        } else {
          courseEndHour += 12
        }
        courseEndMinute = courseEndMinute + courseEndHour * 60

        if (
          fromTimeMinute <= courseStartMinute &&
          courseEndMinute <= toTimeMinute
        ) {
          return true
        } else return false
      }

      return false
    },

    async fullfillsDegreeRequirement(
      degReqState,
      courseName,
      major,
      track,
      studentCoursePlansNames
    ) {
      if (major === 'CSE') {
        // check if any incomplete requirement can be filled
        if (degReqState.breadth1 === false) {
          let breadth1 = [
            'CSE 512',
            'CSE 526',
            'CSE 540',
            'CSE 541',
            'CSE 547',
            'CSE 548',
            'CSE 549'
          ]
          if (breadth1.indexOf(courseName) >= 0) return true
        }
        if (degReqState.breadth2 === false) {
          let breadth2 = [
            'CSE 502',
            'CSE 504',
            'CSE 506',
            'CSE 508',
            'CSE 509',
            'CSE 532',
            'CSE 534',
            'CSE 535'
          ]
          if (breadth2.indexOf(courseName) >= 0) return true
        }
        if (degReqState.breadth3 === false) {
          let breadth3 = [
            'CSE 505',
            'CSE 519',
            'CSE 527',
            'CSE 528',
            'CSE 537',
            'CSE 538',
            'CSE 564'
          ]
          if (breadth3.indexOf(courseName) >= 0) return true
        }
        if (degReqState.track === false) {
          if (track === 'Special Project') {
            if (
              (courseName.split(' ')[0] === 'CSE' &&
                courseName.split(' ')[1] === '522') ||
              (courseName.split(' ')[0] === 'CSE' &&
                courseName.split(' ')[1] !== '523' &&
                courseName.split(' ')[1] !== '524' &&
                courseName.split(' ')[1] !== '529')
            ) {
              return true
            }
          }
          if (track === 'Advanced Project') {
            if (
              (courseName.split(' ')[0] === 'CSE' &&
                courseName.split(' ')[1] === '523') ||
              (courseName.split(' ')[0] === 'CSE' &&
                courseName.split(' ')[1] === '524') ||
              (courseName.split(' ')[0] === 'CSE' &&
                courseName.split(' ')[1] !== '522' &&
                courseName.split(' ')[1] !== '529')
            ) {
              return true
            }
          }
          if (track === 'Thesis') {
            if (
              (courseName.split(' ')[0] === 'CSE' &&
                courseName.split(' ')[1] === '599') ||
              (courseName.split(' ')[0] === 'CSE' &&
                courseName.split(' ')[1] !== '523' &&
                courseName.split(' ')[1] !== '524' &&
                courseName.split(' ')[1] !== '522')
            ) {
              return true
            }
          }
        }
        if (degReqState.credit !== true) {
          let creditCount = 0
          for (let plan of studentCoursePlansNames) {
            let course = await this.getCourseByNameNumber(
              plan.split(' ')[0],
              plan.split(' ')[1]
            )
            creditCount += course.credits
          }
          if (creditCount === 31) return true
        }

        return false
      }
    },
    async updateDegreeRequirementState(coursesSelected, major, track) {
      return this.getDegreeRequirementState(major, track, coursesSelected)
    },
    isDegreeRequirementComplete(degReqState, major) {
      if (major === 'CSE') {
        return (
          degReqState.breadth1 &&
          degReqState.breadth2 &&
          degReqState.breadth3 &&
          degReqState.track &&
          degReqState.credit
        )
      }
    },
    async getDegreeRequirementState(major, track, coursesSelected) {
      let studentCoursePlans = await this.getStudentCoursePlan()
      let studentCoursePlansNames = studentCoursePlans.map(
        (coursePlan) => coursePlan.department + ' ' + coursePlan.course_num
      )

      studentCoursePlansNames.concat(coursesSelected)

      let state = {}
      if (major === 'CSE') {
        state = {
          breadth1: false,
          breadth2: false,
          breadth3: false,
          track: false,
          credit: false
        }
        // check breadth requirements
        let breadth1 = [
          'CSE 512',
          'CSE 526',
          'CSE 540',
          'CSE 541',
          'CSE 547',
          'CSE 548',
          'CSE 549'
        ]
        let breadth2 = [
          'CSE 502',
          'CSE 504',
          'CSE 506',
          'CSE 508',
          'CSE 509',
          'CSE 532',
          'CSE 534',
          'CSE 535'
        ]
        let breadth3 = [
          'CSE 505',
          'CSE 519',
          'CSE 527',
          'CSE 528',
          'CSE 537',
          'CSE 538',
          'CSE 564'
        ]
        for (let course of breadth1) {
          if (studentCoursePlansNames.indexOf(course) >= 0) {
            state.breadth1 = true
            break
          }
        }
        for (let course of breadth2) {
          if (studentCoursePlansNames.indexOf(course) >= 0) {
            state.breadth1 = true
            break
          }
        }
        for (let course of breadth3) {
          if (studentCoursePlansNames.indexOf(course) >= 0) {
            state.breadth1 = true
            break
          }
        }

        // check track requirements
        if (track === 'Special Project') {
          let lectureCount = 0
          let project = false
          for (let course of studentCoursePlansNames) {
            if (
              course.split(' ')[0] === 'CSE' &&
              course.split(' ')[1] === '522'
            ) {
              project = true
            } else if (course.split(' ')[0] === 'CSE') {
              lectureCount += 1
            }
          }

          if (lectureCount === 8 && project === true) {
            state.track = true
          }
        }
        if (track === 'Advanced Project') {
          let lectureCount = 0
          let project1 = false
          let project2 = false
          for (let course of studentCoursePlansNames) {
            if (
              course.split(' ')[0] === 'CSE' &&
              course.split(' ')[1] === '523'
            ) {
              project1 = true
            } else if (
              course.split(' ')[0] === 'CSE' &&
              course.split(' ')[1] === '524'
            ) {
              project2 = true
            } else if (course.split(' ')[0] === 'CSE') {
              lectureCount += 1
            }
          }

          if (lectureCount === 7 && project === true && project2 === true) {
            state.track = true
          }
        }
        if (track === 'Thesis') {
          let lectureCount = 0
          let project = false
          for (let course of studentCoursePlansNames) {
            if (
              course.split(' ')[0] === 'CSE' &&
              course.split(' ')[1] === '599'
            ) {
              project = true
            } else if (course.split(' ')[0] === 'CSE') {
              lectureCount += 1
            }
          }

          if (lectureCount === 6 && project === true) {
            state.track = true
          }
        }
        // check credit requirements
        let creditCount = 0
        for (let plan of studentCoursePlansNames) {
          let course = await this.getCourseByNameNumber(
            plan.split(' ')[0],
            plan.split(' ')[1]
          )
          creditCount += course.credits
        }
        if (creditCount === 31) state.credit = true
        // return the state
        return state
      }
    },
    // passTimeConflict(sortedList[idx]){ // time conflict with already taken courses
    //  // TODO
    //},
    sortCourseBasedOnPreference(courseList, preferenceDict) {
      // let clonedList = _.cloneDeep(courseList);
      let choices = ['High-prereq', 'High', 'Medium', 'Low']
      let sortedList = []
      for (let choice of choices) {
        for (let courseName of courseList) {
          if (preferenceDict[courseName] === choice) sortedList.push(courseName)
        }
      }
      return sortedList
    },
    // clobeeGraph() {
    //   // TODO
    // },
    // cloneEligibleCourseInDepartmentMap(){
    //   // TODO
    // },
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
        (coursePlan) => coursePlan.department + ' ' + coursePlan.course_num
      )
      let eligibleCoursesInDepartment = coursesInDepartment.filter(
        (course) =>
          modifiedCoursePlan.indexOf(
            course.course_name + ' ' + course.course_num
          ) === -1
      )

      // for each preferred course, add all of its prerequisite courses in the main list with high preference. (Remember to do it recursively)
      // at the end of this BFS, we will end of with a complete list of eligibleCoursesInDepartment list.
      let preferenceDict = this.preferedCourseDict // This will hold all the preferred courses at the end of this BFS search
      let eligibleCourseNames = eligibleCoursesInDepartment.map(
        // This will hold all the eligible course names at the end of this BFS search
        (course) => course.course_name + ' ' + course.course_num
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
          // for a prerequisite, if its already taken, dont count increase edge count and dont add edge//////
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
      let eligibleCoursesInDepartmentMap = {}
      eligibleCoursesInDepartment.map((course) => {
        let name = course.course_name + ' ' + course.course_num
        let object = {}
        object['course'] = course
        object['isSelected'] = false
        eligibleCoursesInDepartmentMap[name] = object
      })
      console.log(eligibleCoursesInDepartmentMap)
      let allPlans = this.topoSort(
        graph,
        preferenceDict,
        eligibleCoursesInDepartmentMap,
        student.reqVersion.department,
        student.reqVersion.track
      )
      console.log(allPlans)
      //this.applyFilterPlans = allPlans
    },
    // topoSort should return a list of plans, each plan will contain a list of Semester objects.
    // remember that always taking the high prefered course is not good, since we might end up taking all prereq courses and not take the actual course.
    // while choosing courses for each semester, remember to remove courses that doesnt meet time constraint. It can not be done ahead of sort, bcz semester info is unknown beforehand
    topoSort(
      graph,
      preferenceDict,
      eligibleCoursesInDepartmentMap,
      major,
      track
    ) {
      // maxCoursePerSemester, PreferredStartTime, preferredEndTime

      let degreeReqState = {}
      let semesterCreated = true
      let plan = []
      let semesterCount = 0
      let coursesSelected = []

      while (semesterCreated) {
        // calculate the current semester and year for this level
        let ret = this.calculatedSemesterAndYear(
          this.currentSem,
          this.currentYear,
          semesterCount
        )
        let semester = ret.sem
        let year = ret.year

        if (this.isDegreeRequirementComplete(degreeReqState, major)) break

        // collect All courses that have incomingEdgeCount === 0 && not already taken
        let list = []
        for (let [courseName, node] of graph) {
          if (
            node.incomingEdgeCount === 0 &&
            eligibleCoursesInDepartmentMap[courseName].isSelected === false
          ) {
            list.push(courseName)
          }
        }
        if (list.length === 0) break
        // sort these courses based on their preference strength
        let sortedList = this.sortCourseBasedOnPreference(list, preferenceDict)

        // pick N classes if they are offered and have no time conflict and fulfills a degree requirement // Break out and add current semseter, if degree requirement is full.
        let i = 0
        let idx = 0
        let currentSememster = []
        let credits = []
        while (i < this.maxCourse && idx < this.sortedList.length) {
          if (
            this.isClassOfferedAndTimeConstraintMeet(
              sortedList[idx],
              semester,
              year
            ) &&
            this.passTimeConflict(sortedList[idx]) &&
            this.fullfillsDegreeRequirement(
              degReqState,
              sortedList[idx],
              major,
              track,
              coursesSelected.concat([sortedList[idx]])
            )
          ) {
            // take this class
            coursesSelected.push(sortedList[idx])
            currentSememster.push(sortedList[idx])
            credits.push(
              eligibleCoursesInDepartmentMap[sortedList[idx]].course.credits
            )
            // update degre req state
            degreeReqState = this.updateDegreeRequirementState(
              coursesSelected,
              major,
              track
            )
            // break if degree req is complete
            if (this.isDegreeRequirementComplete(degreeReqState, major)) break
            // update graph isSelected
            eligibleCoursesInDepartmentMap[sortedList[idx]].isSelected = true
            // update incomingEdgeCount of neighbors
            for (let neighbor of graph[sortedList[idx]].neighbors) {
              graph[neighbor].incomingEdgeCount -= 1
            }

            i += 1
          }
          idx += 1
        }

        // if no classes was picked, set semesterCreated to be false. Otherwise, add these classes as a semester in the plan
        if (currentSememster.length == 0) {
          semesterCreated = false
        } else {
          let semesterObj = {}
          semesterObj['semester'] = semester + ' ' + year
          semesterObj['courses'] = currentSememster
          semesterObj['credits'] = credits

          plan.push(semesterObj)
        }
        semesterCount += 1
      }

      // if degree requirement is not complete, return no plan.
      // else return the plan
      let plans = []
      if (this.isDegreeRequirementComplete(degreeReqState, major) === false) {
        return plans
      } else {
        plans.push(plan)
        return plans
      }
    },
    // dfs(graph, preferenceDict, eligibleCoursesInDepartmentMap, maxCourse, currentDegreeRequirementState) {
    //   if(this.degreeRequirementComplete(currentDegreeRequirementState)) return;

    //   // maxCoursePerSemester, PreferredStartTime, preferredEndTime

    //   // find courses from graph that have incomingEdgeCount = 0 and not yet selected
    //   let list = []
    //   for (let [courseName, node] of graph) {
    //     if(node.incomingEdgeCount === 0 && eligibleCoursesInDepartmentMap[courseName].isSelected === false){
    //       list.push(courseName)
    //     }
    //   }

    //   if(list.length === 0) return;

    //   // for a combination of these courses, select them as semester, call dfs and add semester to all created plans
    //   let sortedList = this.sortCourseBasedOnPreference(list, preferenceDict)
    //   if(sortedList.length > maxCourse){
    //     // create subset of lists;
    //   }
    //   else{
    //     for(let courseName of sortedList){
    //       //mark it as visited
    //       //update degreeRequirementstate

    //     }
    //   }

    // },
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
