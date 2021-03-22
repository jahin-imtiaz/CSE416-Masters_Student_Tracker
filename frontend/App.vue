<template>
  <div id="app">
    <img
      src="https://svgshare.com/i/SNz.svg"
      alt="image"
      border="0"
      width="450"
      height="450"
    />

    <router-link to='/foo'>Go to foo</router-link>
    <HelloVno msg="you are building: your project with vno" />
    <!--
      TODO:
      - Homepage with GPD Importing Functionality (Use FIGMA styles)
      - Add Student page (Use FIGMA styles)
      - Implement models
      - Run and test
     -->
  </div>
</template>

<script>
import './routes'
import 'https://unpkg.com/vue-router@3.5.1/dist/vue-router.js'
import HelloVno from './components/HelloVno.vue';

Vue.use(VueRouter)

// 1. Define route components.
// These can be imported from other files
const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }

// 2. Define some routes
// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// `Vue.extend()`, or just a component options object.
// We'll talk about nested routes later.
const routes = [
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar }
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
  routes // short for `routes: routes`
})

export default {
  name: 'app',
  components: {HelloVno},
  mounted() {
    // console.log('hello')
    // console.log({router: this.$router});
    // console.log(router)
    console.log(VueRouter)
  },
};

</script>

<style>
html {
  background-color: #203A42;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #79d0b2;
  margin-top: 60px;
}
</style>