<template>
    <div class="add-student">
        <b-container lg="10" offset="1" class="bv-example-row">
            <b-row>
                <b-col>
                    <b-row>
                      <b-col lg="4">Student ID :</b-col>
                      <b-col>
                        <b-form-input
                            aria-label="Small text input with custom switch"
                            v-model="studentID"
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
export default {
    name: "AddStudent",
    props: {
        msg: String,
    },
    data() {
        return {
            studentID: '',
            firstName: '',
            lastName: '',
            email: '',
            department: '',
            track: '',
            entrySem: '',
            entryYear: '',
            reqVersionSem: '',
            reqVersionYear: '',
            graduationSem: '',
            graduationYear: '',
            password: '',
        };
    },
    methods: {
        addStudent: () => {
            //TODO
        },
    },
};
</script>

<style scoped></style>
