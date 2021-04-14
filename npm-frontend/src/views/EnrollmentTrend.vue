<template>
  <div class="enrollment-trend">
    <NavBar />
    <br />
    <br />Enrollment Trend
    <div>Select Semester</div>
    <b-form-select
      v-model="selected1"
      :options="options1"
      class="mb-3"
      value-field="item"
      text-field="name"
      multiple
      disabled-field="notEnabled"
    ></b-form-select>

    <div class="mt-3">
      Semesters selected:
      <strong>{{ selected }}</strong>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
// import vSelect from 'vue-select'
// import 'vue-select/dist/vue-select.css';
// Vue.component('v-select', vSelect)

export default {
  name: 'EnrollmentTrend',
  props: {
    msg: String
  },
  components: {
    NavBar
  }
  ,
  // methods: {
  //   getStudents(){
  //     axios
  //       .get(`${VUE_APP_BACKEND_API}/students`, this.form)
  //       .then((res) => {
  //         console.log('UPSERTED STUDENT', res.status)
  //       })
  //       .catch((err) => {
  //         console.log('UPSERT STUDENT FAILED', err)
  //       })
  //   }
  // }

  data() {
    return {
      selected1: [],
        options1: [
          { item: 'Spring 2018', name: 'Spring 2018' },
          { item: 'Fall 2018', name: 'Fall 2018' },
          { item: 'Spring 2019', name: 'Spring 2019'},
          { item: 'Fall 2019', name: 'Fall 2019' }
        ],
      selected2: [],
      options2: [],
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
