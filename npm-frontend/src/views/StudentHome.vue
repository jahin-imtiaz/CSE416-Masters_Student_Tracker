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
          <b-button
            class="btn-xl"
            :to="'/view-edit-student/' + this.$store.getters.getStudentID"
          >
            View/Edit Student Information
          </b-button>
        </b-col>
        <b-col>
          <b-button
            class="btn-xl"
            :to="'/suggest-course-plan/' + this.$store.getters.getStudentID"
          >
            Suggest Course Plan
          </b-button>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
export default {
  name: 'StudentHome',
  props: {
    msg: String
  },
  components: {
    NavBar
  },
  mounted: function () {
    if (!this.$store.getters.getStudentID) {
      console.log('Hello')
      this.$router.push('login')
    }
  }
}
</script>
