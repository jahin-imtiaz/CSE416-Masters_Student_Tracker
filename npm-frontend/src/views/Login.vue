<template>
  <div class="login">
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
        description="We'll never share your email with anyone else."
      >
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          placeholder="Enter email"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-2"
        label="Your Password:"
        label-for="input-2"
      >
        <b-form-input
          id="input-2"
          type="password"
          v-model="form.password"
          placeholder="Enter password"
          required
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card>
  </div>
</template>

<script>
import axios from 'axios'
const { VUE_APP_BACKEND_API } = process.env
export default {
  name: 'Login',
  props: {
    msg: String
  },
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      show: true
    }
  },
  mounted: function () {
    this.$store.commit('setStudentID', '')
    this.$store.commit('setGPD', false)
  },
  methods: {
    onSubmit(event) {
      event.preventDefault()
      axios
        .post(`${VUE_APP_BACKEND_API}/login`, this.form)
        .then((res) => {
          console.log(res)
          if (res.data.GPD) {
            this.$store.commit('setGPD', res.data.GPD)
            this.$store.commit('setStudentID', '')
            this.$router.push('gpd-home')
          } else if (res.data.StudentID) {
            this.$store.commit('setGPD', false)
            this.$store.commit('setStudentID', res.data.StudentID)
            this.$router.push('student-home')
          }
        })
        .catch((err) => console.log(err))
    },
    onReset(event) {
      event.preventDefault()
      // Reset our form values
      this.form.email = ''
      this.form.password = ''
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
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
