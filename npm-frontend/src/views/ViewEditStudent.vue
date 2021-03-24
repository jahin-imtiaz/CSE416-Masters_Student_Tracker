<template>
  <div class="view-edit-student">
    <NavBar />
    <br />
    <br />
    View/Edit (Student)
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
export default {
  name: 'ViewEditStudent',
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
