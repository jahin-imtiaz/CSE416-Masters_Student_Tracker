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
import NavBar from '@/components/NavBar.vue'
import SuggestedPlan from '@/components/SuggestedPlan.vue'
import Vue from 'vue'
export default {
  name: 'SuggestCoursePlan',
  components: {
    NavBar,
    SuggestedPlan
  },
  data() {
    return {
      studentID: this.$route.params.studentID,
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

    smartSuggest() {
      //
    },
    applyFilter() {
      //
    },
    selectedPlan() {
      console.log('Selected Plan clicked')
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
