<template>
    <div class="add-student">
        <NavBar/>
        <br><br>
        <b-container lg="10" offset="1" class="bv-example-row">
            <b-row>
                <b-col>
                    <b-row>
                      <b-col lg="4">Student ID :</b-col>
                      <b-col>
                        <b-form-input
                            aria-label="Small text input with custom switch"
                            v-model="_id.sbu_id"
                        ></b-form-input>
                      </b-col>
                    </b-row>

                    <b-row>
                      <b-col lg="4">First Name :</b-col>
                      <b-col>
                        <b-form-input
                            aria-label="Small text input with custom switch"
                            v-model="firstName"
                        ></b-form-input>
                      </b-col>
                    </b-row>

                    <b-row>
                      <b-col lg="4">Department :</b-col>
                      <b-col>
                        <b-form-input
                            aria-label="Small text input with custom switch"
                            v-model="department"
                        ></b-form-input>
                    </b-col></b-row>

                    <b-row>
                      <b-col lg="4">Entry Semester :</b-col>
                      <b-col>
                          <b-form-input
                              aria-label="Small text input with custom switch"
                              v-model="entrySem"
                          ></b-form-input>
                      </b-col>
                    </b-row>

                    <b-row>
                      <b-col lg="4">Req. Version Semester :</b-col>
                      <b-col>
                          <b-form-input
                              aria-label="Small text input with custom switch"
                              v-model="reqVersionSem"
                          ></b-form-input>
                      </b-col>
                    </b-row>

                    <b-row>
                      <b-col lg="4">Graduation Semester :</b-col>
                      <b-col>
                          <b-form-input
                              aria-label="Small text input with custom switch"
                              v-model="graduationSem"
                          ></b-form-input>
                      </b-col>
                    </b-row>

                    <b-row>
                      <b-col lg="4">Password :</b-col>
                      <b-col>
                          <b-form-input
                              aria-label="Small text input with custom switch"
                              v-model="password"
                          ></b-form-input>
                      </b-col>
                    </b-row>
                </b-col>

                <b-col>
                    <b-row>
                      <b-col lg="4">Email : </b-col>
                      <b-col>
                          <b-form-input
                              aria-label="Small text input with custom switch"
                              v-model="email"
                          ></b-form-input>
                      </b-col>
                    </b-row>

                    <b-row>
                      <b-col lg="4"> Last Name :</b-col>
                      <b-col>
                          <b-form-input
                              aria-label="Small text input with custom switch"
                              v-model="lastName"
                          ></b-form-input>
                      </b-col>
                    </b-row>

                    <b-row>
                      <b-col lg="4">Track :</b-col>
                      <b-col>
                          <b-form-input
                              aria-label="Small text input with custom switch"
                              v-model="track"
                          ></b-form-input>
                      </b-col>
                    </b-row>

                    <b-row>
                      <b-col lg="4">Entry Year :</b-col>
                      <b-col>
                          <b-form-input
                              aria-label="Small text input with custom switch"
                              v-model="entryYear"
                          ></b-form-input>
                      </b-col>
                    </b-row>

                    <b-row>
                      <b-col lg="4">Req Version year :</b-col>
                      <b-col>
                          <b-form-input
                              aria-label="Small text input with custom switch"
                              v-model="reqVersionYear"
                          ></b-form-input>
                      </b-col>
                    </b-row>

                    <b-row>
                      <b-col lg="4"> Graduation Year :</b-col>
                      <b-col>
                          <b-form-input
                              aria-label="Small text input with custom switch"
                              v-model="graduationYear"
                          ></b-form-input>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col></b-col>
                      <b-col lg="2" class="pb-2" @click="addStudent"
                        ><b-button> Add </b-button>
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

const { BACKEND_API } = process.env

export default {
    name: "AddStudent",
    props: {
        msg: String,
    },
    components: {
        NavBar
    },
    data() {
        return {
            form: {
                '_id.sbu_id': '',
                firstName: '',
                lastName: '',
                email: '',
                track: '',
                entrySem: '',
                entryYear: '',
                reqVersion: {
                    department: '',
                    reqSem: '',
                    reqYear: '',
                },
                graduationSem: '',
                graduationYear: '',
                password: ''
            }
        };
    },
    methods: {
        addStudent: () => {
            axios.post(`${BACKEND_API}/students/add`, this.form)
            .then((res) => {
                console.log("ADDED STUDENT", res.status)
            })
            .catch((err) => {
                console.log("ADD STUDENT FAILED", err)
            })
        },
    },
};
</script>

<style scoped></style>
