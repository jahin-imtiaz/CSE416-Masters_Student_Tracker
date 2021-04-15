<template>
  <div class="enrollment-trend">
    <NavBar />
    <br />
    <br />Enrollment Trend
    <br />
    <br />
    <b-row>
      <b-col>
        <b-form-group
          id="semestersID"
          label-cols-sm="3"
          content-cols-sm="9"
          label="Select Semester"
        >
          <b-form-tags v-model="selectedSemesters" no-outer-focus no-add-on-enter class="mb-2">
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
                  placeholder="Semester - i.e. Spring 2019"
                  class="form-control"
                />
                <b-input-group-append>
                  <b-input-group>
                    <b-input-group-append>
                      <b-button
                        @click="addTagWrapperSemester(addTag, inputAttrs)"
                        :style="myStyle"
                      >Add</b-button>
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
                    @click="removeTagWrapperSemester(removeTag, tag)"
                    variant="link"
                    size="sm"
                    :aria-controls="`my-custom-tags-tag_${tag.replace(
                            /\s/g,
                            '_'
                          )}_`"
                  >remove</b-button>
                </b-card>
              </ul>
            </template>
          </b-form-tags>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-form-group id="semestersID" label-cols-sm="3" content-cols-sm="9" label="Select Course">
          <b-form-tags
            v-model="selectedCourses"
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
                  placeholder="Course - i.e. CSE 512"
                  class="form-control"
                />
                <b-input-group-append>
                  <b-input-group>
                    <b-input-group-append>
                      <b-button
                        @click="addTagWrapperCourse(addTag, inputAttrs)"
                        :style="myStyle"
                      >Add</b-button>
                    </b-input-group-append>
                  </b-input-group>
                </b-input-group-append>
              </b-input-group>
              <ul
                id="my-custom-tags-list1"
                class="list-unstyled d-inline-flex flex-wrap mb-0"
                aria-live="polite"
                aria-atomic="false"
                aria-relevant="additions removals"
              >
                <b-card
                  v-for="tag in tags"
                  :key="tag"
                  :id="`my-custom-tags-tag1_${tag.replace(/\s/g, '_')}_`"
                  tag="li"
                  class="mt-1 mr-1"
                  body-class="py-1 pr-2 text-nowrap"
                >
                  <strong>{{ tag }}</strong>
                  <b-button
                    @click="removeTagWrapperCourse(removeTag, tag)"
                    variant="link"
                    size="sm"
                    :aria-controls="`my-custom-tags-tag1_${tag.replace(
                            /\s/g,
                            '_'
                          )}_`"
                  >remove</b-button>
                </b-card>
              </ul>
            </template>
          </b-form-tags>
        </b-form-group>
      </b-col>
    </b-row>

    <div id="chart-container">
      <fusioncharts
        :type="type"
        :width="width"
        :height="height"
        :dataformat="dataFormat"
        :dataSource="dataSource"
      ></fusioncharts>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import Vue from 'vue';
import VueFusionCharts from 'vue-fusioncharts';
import FusionCharts from 'fusioncharts';
import Column2D from 'fusioncharts/fusioncharts.charts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

Vue.use(VueFusionCharts, FusionCharts, Column2D, FusionTheme);

export default {
  name: 'EnrollmentTrend',
  props: {
    msg: String
  },
  components: {
    NavBar
  }
  ,
  methods: {
     validatorCourse(tag) {
      return tag.trim().search('^[A-Z]{3} [1-9]{1}[0-9]{2}$') === 0
    },
    addTagWrapperSemester(addTag, inputAttrs){
      addTag()
      console.log(inputAttrs.value)
    },
    removeTagWrapperSemester(removeTag, tag){
      removeTag(tag)
    },
    addTagWrapperCourse(addTag, inputAttrs) {
      addTag()
      console.log(inputAttrs.value)
    },
    removeTagWrapperCourse(removeTag, tag) {
      removeTag(tag)
    },

  },
  data() {
    return {
      type: "msline",
      width: "100%",
      height: "100%",
      dataFormat: "json",
      myStyle: {
        backgroundColor: '#800000',
        color: 'white',
        textAlign: 'center'
      },
      selectedSemesters: [],
      selectedCourses: [],
  dataSource: {
    // Chart Configuration
    chart: {
    caption: "Enrollement Trend for Courses",
    yaxisname: "Number of Students Enrolled",
    showhovereffect: "1",
    numbersuffix: "",
    drawcrossline: "1",
    plottooltext: "<b>$dataValue</b> of students were on $seriesName",
    theme: "fusion"
  },
  categories: [
    {
      category: [
        {
          label: "Spring 2019"
        },
        {
          label: "Fall 2019"
        },
        {
          label: "Spring 2020"
        },
        {
          label: "Fall 2020"
        },
        {
          label: "Spring 2021"
        }
      ]
    }
  ],
  dataset: [
    {
      seriesname: "CSE 504",
      data: [
        {
          value: "62"
        },
        {
          value: "64"
        },
        {
          value: "64"
        },
        {
          value: "66"
        },
        {
          value: "78"
        }
      ]
    },
    {
      seriesname: "CSE 512",
      data: [
        {
          value: "16"
        },
        {
          value: "28"
        },
        {
          value: "34"
        },
        {
          value: "42"
        },
        {
          value: "54"
        }
      ]
    },
  ]
  }
,
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
