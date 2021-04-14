<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      |
      <router-link to="/about">About</router-link>
      |
      <router-link to="/gpd-home">GPD Home</router-link>
      |
      <router-link to="/student-home">Student Home</router-link>
      |
      <router-link to="/import-files">Import File</router-link>
      |
      <router-link :to="'/suggest-course-plan/0' + this.$store.state.studentID">
        Suggest Course Plan
      </router-link>
      |
      <router-link to="/add-student">Add Student</router-link>
      |
      <router-link to="/add-course">Add Course</router-link>
      |
      <router-link :to="'/view-edit-student/0' + this.$store.state.studentID">
        View/Edit (Student)
      </router-link>
      |
      <router-link to="/view-edit-gpd/0">View/Edit (GPD)</router-link>
      |
      <router-link to="/browse-search-student">
        Browse/Search Student
      </router-link>
      |
      <router-link to="/enrollment-trend">Enrollment Trend</router-link>
      |
      <router-link to="/login">Login</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
