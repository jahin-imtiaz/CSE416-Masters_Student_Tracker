<template>
  <div class="add-student">
    <NavBar />
    <br />
    <br />
    <b-container lg="10" offset="1" class="bv-example-row">
      <b-row>
        <b-col>
          <b-row>
            <b-col lg="4">Student ID :</b-col>
            <b-col>
              <b-form-input
                aria-label="Small text input with custom switch"
                v-model="form._id.sbu_id"
              ></b-form-input>
            </b-col>
          </b-row>

          <b-row>
            <b-col lg="4">First Name :</b-col>
            <b-col>
              <b-form-input
                aria-label="Small text input with custom switch"
                v-model="form.firstName"
              ></b-form-input>
            </b-col>
          </b-row>

          <b-row>
            <b-col lg="4">Department :</b-col>
            <b-col>
              <b-form-input
                aria-label="Small text input with custom switch"
                v-model="form.reqVersion.department"
              ></b-form-input>
            </b-col>
          </b-row>

          <b-row>
            <b-col lg="4">Entry Semester :</b-col>
            <b-col>
              <b-form-input
                aria-label="Small text input with custom switch"
                v-model="form.entrySem"
              ></b-form-input>
            </b-col>
          </b-row>

          <b-row>
            <b-col lg="4">Req. Version Semester :</b-col>
            <b-col>
              <b-form-input
                aria-label="Small text input with custom switch"
                v-model="form.reqVersion.reqSem"
              ></b-form-input>
            </b-col>
          </b-row>

          <b-row>
            <b-col lg="4">Graduation Semester :</b-col>
            <b-col>
              <b-form-input
                aria-label="Small text input with custom switch"
                v-model="form.graduationSem"
              ></b-form-input>
            </b-col>
          </b-row>

          <b-row>
            <b-col lg="4">Password :</b-col>
            <b-col>
              <b-form-input
                aria-label="Small text input with custom switch"
                v-model="form.password"
              ></b-form-input>
            </b-col>
          </b-row>
        </b-col>

        <b-col>
          <b-row>
            <b-col lg="4">Email :</b-col>
            <b-col>
              <b-form-input
                aria-label="Small text input with custom switch"
                v-model="form.email"
              ></b-form-input>
            </b-col>
          </b-row>

          <b-row>
            <b-col lg="4">Last Name :</b-col>
            <b-col>
              <b-form-input
                aria-label="Small text input with custom switch"
                v-model="form.lastName"
              ></b-form-input>
            </b-col>
          </b-row>

          <b-row>
            <b-col lg="4">Track :</b-col>
            <b-col>
              <b-form-input
                aria-label="Small text input with custom switch"
                v-model="form.track"
              ></b-form-input>
            </b-col>
          </b-row>

          <b-row>
            <b-col lg="4">Entry Year :</b-col>
            <b-col>
              <b-form-input
                aria-label="Small text input with custom switch"
                v-model="form.entryYear"
              ></b-form-input>
            </b-col>
          </b-row>

          <b-row>
            <b-col lg="4">Req Version year :</b-col>
            <b-col>
              <b-form-input
                aria-label="Small text input with custom switch"
                v-model="form.reqVersion.reqYear"
              ></b-form-input>
            </b-col>
          </b-row>

          <b-row>
            <b-col lg="4">Graduation Year :</b-col>
            <b-col>
              <b-form-input
                aria-label="Small text input with custom switch"
                v-model="form.graduationYear"
              ></b-form-input>
            </b-col>
          </b-row>
          <b-row>
            <b-col></b-col>
            <b-col lg="2" class="pb-2" @click="addStudent">
              <b-button>Add</b-button>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import axios from 'axios'

const { VUE_APP_BACKEND_API } = process.env

export default {
  name: 'AddStudent',
  props: {
    msg: String
  },
  components: {
    NavBar
  },
  data() {
    return {
      form: {
        _id: { sbu_id: '' },
        firstName: '',
        lastName: '',
        email: '',
        track: '',
        entrySem: '',
        entryYear: '',
        reqVersion: {
          department: '',
          reqSem: '',
          reqYear: ''
        },
        graduationSem: '',
        graduationYear: '',
        password: ''
      }
    }
  },
  methods: {
    addStudent() {
      axios
        .post(`${VUE_APP_BACKEND_API}/students/add`, this.form)
        .then((res) => {
          console.log('UPSERTED STUDENT', res.status)
        })
        .catch((err) => {
          console.log('UPSERT STUDENT FAILED', err)
        })
    }
  }
}
</script>

<style scoped></style>
