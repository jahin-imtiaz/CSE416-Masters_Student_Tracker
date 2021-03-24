<template>
  <div class="enrollment-trend">
    <NavBar />
    <br />
    <br />
    Enrollment Trend
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
export default {
  name: 'EnrollmentTrend',
  props: {
    msg: String
  },
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
