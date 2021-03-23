<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> | 
      <router-link to="/gpd-home">GPD Home</router-link> |
      <router-link to="/suggest-course-plan">Suggest Course Plan</router-link> |
      <router-link to="/add-student">Add Student</router-link> |
      <router-link to="/add-course">Add Course</router-link> |
      <router-link to="/view-edit-student">View/Edit (Student)</router-link> |
      <router-link to="/view-edit-gpd">View/Edit (GPD)</router-link> |
      <router-link to="/browse-search-student">Browse/Search Student</router-link> |
      <router-link to="/enrollment-trend">Enrollment Trend</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
  import mongoose from 'mongoose'
  
  const { MongoURI } = process.env

  mongoose.connect(MongoURI, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true, useUnifiedTopology: true })

  // Mongo connection successful
  mongoose.connection.on('connected', () => {
    logger.info(`Mongoose default connection open to ${MONGODB_URL}`)
  })

  // Mongo connection throws an error
  mongoose.connection.on('error', console.error.bind(console, 'Mongoose default connection error:'))

  // Mongo connection is disconnected
  mongoose.connection.on('disconnected', () => {
    logger.info('Mongoose default connection disconnected')
  })

  // Close the connection if the node process is terminated
  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      logger.warn('Mongoose default connection disconnected through app termination')
    })

    process.exit(0)
  })



</script>


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
