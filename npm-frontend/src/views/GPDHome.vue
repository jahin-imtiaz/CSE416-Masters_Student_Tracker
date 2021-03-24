<template>
  <div class="gpd-home">
    <NavBar />
    <br />
    <br />
    <br />
    <br />
    <b-container class="bv-example-row">
      <b-row>
        <b-col>
          <b-button class="btn-xl" to="/import-files">
            Upload Course Information
          </b-button>
        </b-col>
        <b-col>
          <b-button class="btn-xl" to="/import-files">
            Upload Degree Requirements
          </b-button>
        </b-col>
        <b-col>
          <b-button class="btn-xl" to="/import-files">
            Upload Course Offerings
          </b-button>
        </b-col>
      </b-row>
      <br />
      <b-row>
        <b-col>
          <b-button class="btn-xl" v-on:click="deleteAllStudents">
            Delete All Student
          </b-button>
        </b-col>
        <b-col>
          <b-button class="btn-xl" to="/import-files">
            Upload Student Data
          </b-button>
        </b-col>
        <b-col>
          <b-button class="btn-xl" to="/add-student">Add Student</b-button>
        </b-col>
      </b-row>
      <br />
      <b-row>
        <b-col>
          <b-button class="btn-xl" to="/import-files">Import Grades</b-button>
        </b-col>
        <b-col>
          <b-button class="btn-xl" to="/browse-search-student">
            Browse/Search Student
          </b-button>
        </b-col>
        <b-col>
          <b-button class="btn-xl" to="/enrollment-trend">
            Enrollment Trend
          </b-button>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import axios from 'axios'
const { VUE_APP_BACKEND_API } = process.env
export default {
  name: 'GPDHome',
  props: {
    msg: String
  },
  components: {
    NavBar
  },
  methods: {
    deleteAllStudents() {
      axios
        .post(`${VUE_APP_BACKEND_API}/students/delete-all`)
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.btn-xl {
  padding: 10px 20px;
  font-size: 18px;
  border-radius: 10px;
  width: 290px !important;
  background-color: #a30e0e;
}
.btn-xl:hover {
  background-color: #800000;
}
</style>
