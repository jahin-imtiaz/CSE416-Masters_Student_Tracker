<template>
  <div class="hello">
    <NavBar/>
    <b-container lg="10" offset="1" class="bv-example-row">
        <b-container fluid>
            <b-row>
                <b-col lg="4"> Semester :</b-col>
                <b-col>
                    <b-form-input
                        aria-label="Small text input with custom switch"
                        v-model="semester"
                    ></b-form-input>
                </b-col>
            </b-row>

            <b-row>
                <b-col lg="4"> Year :</b-col>
                <b-col>
                    <b-form-input
                        aria-label="Small text input with custom switch"
                        v-model="year"
                    ></b-form-input>
                </b-col>
            </b-row>

            <b-row>
                <b-col lg="4"> Department :</b-col>
                <b-col>
                    <b-form-input
                        aria-label="Small text input with custom switch"
                        v-model="department"
                    ></b-form-input>
                </b-col>
            </b-row>

            <b-row lg="10">
                <b-col>
                    <b-form-file
                        v-model="courseFile"
                        placeholder="Choose a Course file or drop it here..."
                        drop-placeholder="Drop file here..."
                    ></b-form-file>
                </b-col>
                <b-col>
                    <b-row>
                        <b-col>Selected file: {{ courseFile ? courseFile.name : '' }}</b-col>
                        <b-col><b-button variant="secondary" @click="loadCourseFile">add</b-button></b-col>
                    </b-row>
                </b-col>
            </b-row>
        </b-container>

    <b-row class="mt-3">
        <b-col>
            <b-form-file
                v-model="degreeReqFile"
                placeholder="Choose a Degree Requirement file or drop it here..."
                drop-placeholder="Drop file here..."
            ></b-form-file>
        </b-col>
        <b-col>
            <b-row>
                <b-col>Selected file: {{ degreeReqFile ? degreeReqFile.name : '' }}</b-col>
                <b-col><b-button variant="secondary" @click="loadDegReFile">add</b-button></b-col>
            </b-row>
        </b-col>
    </b-row>

    <b-row class="mt-3">
        <b-col>
            <b-form-file
                v-model="courseOfferingFile"
                placeholder="Choose a Course Offerings file or drop it here..."
                drop-placeholder="Drop file here..."
            ></b-form-file>
        </b-col>
        <b-col>
            <b-row>
                <b-col>Selected file: {{ courseOfferingFile ? courseOfferingFile.name : '' }}</b-col>
                <b-col><b-button variant="secondary" @click="loadCourseOfferingFile">add</b-button></b-col>
            </b-row>
        </b-col>
    </b-row>
    
    <b-row  class="mt-3">
        <b-col>
            <b-form-file
                v-model="studentFile"
                placeholder="Choose a Students file or drop it here..."
                drop-placeholder="Drop file here..."
            ></b-form-file>
        </b-col>
        <b-col>
            <b-row>
                <b-col>Selected file: {{ studentFile ? studentFile.name : '' }}</b-col>
                <b-col><b-button variant="secondary" @click="loadStudentFile">add</b-button></b-col>
            </b-row>
        </b-col>
    </b-row>

    <b-row>
        <b-col>
            <b-form-file
                v-model="coursePlanFile"
                placeholder="Choose a Course Plan file or drop it here..."
                drop-placeholder="Drop file here..."
            ></b-form-file>
        </b-col>
        <b-col>
            <b-row>
                <b-col>Selected file: {{ coursePlanFile ? coursePlanFile.name : '' }}</b-col>
                <b-col><b-button variant="secondary" @click="loadCoursePlanFile">add</b-button></b-col>
            </b-row>
        </b-col>
    </b-row>

    <b-row class="mt-3">
        <b-col>
            <b-form-file
                v-model="gradesFile"
                placeholder="Choose a Grades file or drop it here..."
                drop-placeholder="Drop file here..."
            ></b-form-file>
        </b-col>
        <b-col>
            <b-row>
                <b-col>Selected file: {{ gradesFile ? gradesFile.name : '' }}</b-col>
                <b-col><b-button variant="secondary" @click="loadGradesFile">add</b-button></b-col>
            </b-row>
        </b-col>
    </b-row>
    </b-container>

  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
export default {
    name: 'hello-vno',
    props: {
        msg: String,
    },
    components: {
        NavBar
    },
    data() {
        return {
            courseFile : null,
            degreeReqFile: null,
            courseOfferingFile: null,
            studentFile: null,
            coursePlanFile:null,
            gradesFile: null,
            semester: null,
            year: null,
            department: null,
        }
    },
    methods: {
        loadCourseFile(){
            
        },
        loadDegReFile(){
            const file = this.degreeReqFile;
            const reader = new FileReader();
            reader.onload = (e) => {
                let reqJson = e.target.result;
                console.log(reqJson);
                this.degreeReqFile = null;
            }
            reader.readAsText(file);
        },
        loadCourseOfferingFile(){
            const file = this.courseOfferingFile;
            const reader = new FileReader();
            let courseOfferingsArr = [];
            reader.onload = (e) => {
                let text = e.target.result;
                text = text.split("\n");
                for(let i = 1; i < text.length; i++){
                    let newCourseOffering = {};
                    let currCourse = text[i].split(",");
                    newCourseOffering.department = currCourse[0];
                    newCourseOffering.course_num = currCourse[1];
                    newCourseOffering.section = currCourse[2];
                    newCourseOffering.semester = currCourse[3];
                    newCourseOffering.year = currCourse[4];

                    let timeSplit = currCourse[5].split(" ");
                    let times = timeSplit[1].split("-");

                    newCourseOffering.days = timeSplit[0];
                    newCourseOffering.start_time = times[0];
                    newCourseOffering.end_time = times[1];
                    courseOfferingsArr.push(newCourseOffering);
                }  
                console.log(courseOfferingsArr);
                this.courseOfferingFile = null;
            }
            reader.readAsText(file);
        },
        loadStudentFile(){
            const file = this.studentFile;
            const reader = new FileReader();
            let studentsArr = [];
            reader.onload = (e) => {
                let text = e.target.result;
                text = text.split("\n");
                for(let i = 1; i < text.length; i++){
                    let newStudent = {};
                    let currStudent = text[i].split(",");
                    newStudent.sbu_id = currStudent[0];
                    newStudent.firstName = currStudent[1];
                    newStudent.lastName = currStudent[2];
                    newStudent.email = currStudent[3];
                    newStudent.department = currStudent[4];
                    newStudent.track = currStudent[5];
                    newStudent.entrySem = currStudent[6];
                    newStudent.entryYear = currStudent[7];
                    newStudent.reqVersionSemester = currStudent[8];
                    newStudent.reqVersionYear = currStudent[9];
                    newStudent.graduationSem = currStudent[10];
                    newStudent.graduationYear = currStudent[10];
                    newStudent.password = currStudent[10];

                    studentsArr.push(newStudent);
                }  
                console.log(studentsArr);
                this.studentFile = null;
            }
            reader.readAsText(file);
        },
        loadCoursePlanFile() {
            const file = this.coursePlanFile;
            const reader = new FileReader();
            let coursePlanArr = [];
            reader.onload = (e) => {
                let text = e.target.result;
                text = text.split("\n");
                for(let i = 1; i < text.length; i++){
                    let newCoursePlan = {};
                    let currPlan = text[i].split(",");
                    newCoursePlan.sbu_id = currPlan[0];
                    newCoursePlan.department = currPlan[1];
                    newCoursePlan.course_num = currPlan[2];
                    newCoursePlan.section = currPlan[3];
                    newCoursePlan.semester = currPlan[4];
                    newCoursePlan.year = currPlan[5];
                    newCoursePlan.grade = currPlan[6];

                    coursePlanArr.push(newCoursePlan);
                }  
                console.log(coursePlanArr);
                this.coursePlanFile = null;
            }
            reader.readAsText(file);
        },
        loadGradesFile(){
            const file = this.gradesFile;
            const reader = new FileReader();
            let gradesArr = [];
            reader.onload = (e) => {
                let text = e.target.result;
                text = text.split("\n");
                for(let i = 1; i < text.length; i++){
                    let newGrade = {};
                    let curGrade = text[i].split(",");
                    newGrade.sbu_id = curGrade[0];
                    newGrade.department = curGrade[1];
                    newGrade.course_num = curGrade[2];
                    newGrade.section = curGrade[3];
                    newGrade.semester = curGrade[4];
                    newGrade.year = curGrade[5];
                    newGrade.grade = curGrade[6];

                    gradesArr.push(newGrade);
                }  
                console.log(gradesArr);
                this.gradesFile = null;
            }
            reader.readAsText(file);
        }
    }
};
</script>

<style>
.importFileDiv {
    background-color: antiquewhite;
}

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
  color: #79d0b2;
}
</style>