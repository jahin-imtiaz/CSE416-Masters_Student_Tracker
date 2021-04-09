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
              placeholder="1120101010"
              value="1120101010"
              v-model="studentID"
              readonly="true"
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
            id="graduatedID"
            label-cols-sm="4"
            content-cols-sm="8"
            label="Graduated"
            label-for="graduated"
          >
            <b-form-input id="graduated" v-model="graduated"></b-form-input>
          </b-form-group>
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
        <b-col cols="2" align-self="end">
          Course Plan
          <b-button-group vertical>
            <div>
              <b-button
                block
                :style="myStyle"
                size="sm"
                @click="suggestCoursePlan"
              >
                Suggest Course Plan
              </b-button>
            </div>
            <div class="mt-2">
              <b-button block :style="myStyle" size="sm" @click="addCourse">
                Add Course
              </b-button>
            </div>
          </b-button-group>
        </b-col>
        <b-col>
          <b-row>
            <b-col cols="6">Course Name</b-col>
            <b-col cols="2">Credits</b-col>
            <b-col cols="2">Grade</b-col>
            <b-col cols="2">Status</b-col>
          </b-row>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="2" align-self="end">Course Requirements</b-col>
        <b-col>
          <b-row>
            <b-col cols="8">Requirements</b-col>
            <b-col cols="4">Status</b-col>
          </b-row>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="2" align-self="end">Comment</b-col>
        <b-col>Description</b-col>
      </b-row>
      <b-row>
        <b-button-group vertical>
          <div class="mt-2">
            <b-button block :style="myStyle" size="sm" @click="saveChanges">
              Save Changes
            </b-button>
          </div>
        </b-button-group>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
export default {
  name: 'ViewEditStudent',
  props: {},
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
