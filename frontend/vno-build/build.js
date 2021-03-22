/* eslint-disable */
/* eslint-disable prettier/prettier */
// deno-lint-ignore-file
import Vue from "https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.js";

const HelloVno = Vue.component("hello-vno", {
  template:  /* html */ `
  <div class="hello">
    <img
      src="https://svgshare.com/i/SNz.svg"
      alt="image"
      border="0"
      width="450"
      height="450"
    />
    <h1>{{ msg }}</h1>
    <p>
      <br />
    </p>
    <h3>
      <a href="https://vno.land" target="_blank" rel="noopener">vno.land</a> &
      <a
        href="https://github.com/oslabs-beta/vno"
        target="_blank"
        rel="noopener">
        github
      </a>
    </h3>
    <ul>
      <br />
    </ul>
  </div>
`,
  name: 'hello-vno',
  props: {
    msg: String,
  },
});

const Login = Vue.component("login", {
  template:  /* html */ `
  <div class="login">
    Login {{ msg }}
  </div>
`,
  name: 'login',
  props: {
    msg: String,
  },
});

const Home = Vue.component("home", {
  template:  /* html */ `
  <div class="home">
    Home {{ msg }}
  </div>
`,
  name: 'home',
  props: {
    msg: String,
  },
});

const App = new Vue({
  template:  /* html */ `
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
    <body v-if="displayedComponent === 'home'">
      <Home />
    </body>
    
  </div>
`,
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
    
  },
});

App.$mount("#app")