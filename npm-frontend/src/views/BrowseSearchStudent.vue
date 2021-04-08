<template>
  <div class="browse-search-student">
    <NavBar />
    <br />
    <br />
    <h2>Browse/Search Student</h2>
    <br />
    <br />
    <b-container class="bv-example-row">
      <b-row>
        <b-col>
          <b-form-group
            label="Sort By:"
            label-cols-lg="2"
            label-class="font-weight-bold pt-0"
            class="mb-0"
            v-slot="{ ariaDescribedby }"
          >
            <b-form-radio-group
              :options="['Name', 'Graduation Semester', 'Number of Semesters']"
              :aria-describedby="ariaDescribedby"
              stacked
              class="radioLeft"
            ></b-form-radio-group>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group
            label="Filters:"
            label-cols-lg="2"
            label-class="font-weight-bold pt-0"
            class="mb-0"
          >
            <b-form-group
              label="Name"
              label-for="nested-name"
              label-cols-sm="5"
              label-align-sm="left"
            >
              <b-form-input id="nested-name" class="m-0"></b-form-input>
            </b-form-group>
            <b-form-group
              label="Graduation Semester"
              label-for="nested-semester"
              label-cols-sm="5"
              label-align-sm="left"
            >
              <b-form-select id="nested-semester" class="m-0" v-model="selected" :options="options"></b-form-select>
            </b-form-group>
                        <b-form-group
              label="Course Plan Validity"
              label-for="nested-validity"
              label-cols-sm="5"
              label-align-sm="left"
            >
              <b-form-select id="nested-validity" class="m-0" v-model="selected" :options="options"></b-form-select>
            </b-form-group>
            <b-form-group
              label="Course Plan Status"
              label-for="nested-status"
              label-cols-sm="5"
              label-align-sm="left"
            >
              <b-form-select id="nested-status" class="m-0" v-model="selected" :options="options"></b-form-select>
            </b-form-group>
            <b-button class="btn">Apply</b-button>
          </b-form-group>
        </b-col>
      </b-row>
    <br />
    <div>
      <b-table striped hover :items="Students"></b-table>
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
      Students: []
    }
  },
  methods: {
    getStudent() {
      axios
        .get(`${VUE_APP_BACKEND_API}/students`)
        .then((res) => {
          console.log('RETRIEVE STUDENTS', res.data)
          this.Students = res.data
        })
        .catch((err) => {
          console.log('RETRIEVE STUDENTS FAILED', err)
        })
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
    text-align:left;
}
.btn {
  padding: 5px 25px;
  border-radius: 10px;
  background-color: #a30e0e;
  float: right;
}
.btn:hover {
  background-color: #800000;
}
</style>
