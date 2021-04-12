<template>
  <div>
    <b-table
      responsive
      fixed
      bordered
      small
      striped
      hover
      :items="items"
      caption-top
    >
      <template #thead-top="">
        <b-tr :style="myStyle">
          <b-th colspan="3">Plan {{ index + 1 }}</b-th>
        </b-tr>
      </template>
    </b-table>
    <b-button @click="selectButtonClicked" :style="myStyle">
      Select
    </b-button>
  </div>
</template>

<script>
export default {
  name: 'SuggestPlan',
  props: {
    plan: Array,
    index: Number,
    selectedPlan: Function
  },
  data() {
    return {
      items: [],

      myStyle: {
        backgroundColor: '#800000',
        color: 'white',
        textAlign: 'center'
      }
    }
  },
  methods: {
    selectButtonClicked() {
      // select the plan and update database
      this.selectedPlan()
    }
  },
  mounted: function() {
    let newItemObject = []
    for (var eachSem of this.plan) {
      let courses = eachSem.courses
      let str1 = ''
      for (var course of courses) {
        str1 += course + ' \n'
      }

      let credits = eachSem.credits
      let str2 = ''
      for (var credit of credits) {
        str2 += credit + ' \n'
      }

      let sem = { Semester: eachSem.semester, Courses: str1, Credit: str2 }
      newItemObject.push(sem)
    }

    this.items = newItemObject
  }
}
</script>

<style scoped>
.navbar.navbar-dark.bg-dark {
  background-color: #800000 !important;
  height: 60px;
}
.navbar-brand {
  right: 50px;
}
.navbar-dark .navbar-nav .nav-link {
  color: #d3d3d3 !important;
}
.navbar-dark .navbar-nav .nav-link:hover {
  color: #ffffff !important;
}

div {
  white-space: pre;
}
</style>
