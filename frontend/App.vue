<template>
  <div id="app">
    <header>
      
      <nav class="inner">
        <button v-on:click="handleRoute('home')">Home</button>
        <button v-on:click="handleRoute('login')">Login</button>
      </nav>
    </header>
    <body v-if="displayedComponent === 'login'">
      <Login />
    </body>
    <body v-else-if="displayedComponent === 'home'">
      <Home />
    </body>
    <body v-else>
      <HelloVno msg="you are building: your project with vno" />
    </body>
  </div>
</template>

<script>
import HelloVno from './components/HelloVno.vue';
import Home from './components/Home'
import Login from './components/Login'

export default {
  name: 'app',
  data() {
    return {
      displayedComponent: 'login',
    }
  },
  methods: {
    handleRoute: function (event) {
      this.displayedComponent = event;
      console.log(this.displayedComponent)
    }
  },
  components: {
    HelloVno,
    Login,
    Home
  },
  mounted() {
    // console.log('hello')
  },
};

</script>

<style>
/* html {
  background-color: #203A42;
} */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #79d0b2;
  margin-top: 60px;
}
</style>