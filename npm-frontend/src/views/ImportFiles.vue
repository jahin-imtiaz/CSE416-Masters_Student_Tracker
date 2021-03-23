<template>
  <div class="hello">
    <b-container lg="10" offset="1" class="bv-example-row">
    <b-row class="mt-3">
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
export default {
    name: 'hello-vno',
    props: {
        msg: String,
    },
    data() {
        return {
            courseFile : null,
            degreeReqFile: null,
            courseOfferingFile: null,
            studentFile: null,
            coursePlanFile:null,
            gradesFile: null,
        }
    },
    methods: {
        loadCourseFile(){

        },
        loadDegReFile(){

        },
        loadCourseOfferingFile(){

        },
        loadStudentFile(){

        },
        loadCoursePlanFile() {
            const file = this.courseFile;
            const reader = new FileReader();
            let courseOfferingsArr = [];
            reader.onload = (e) => {
                let text = e.target.result;
                text = text.split("\n");
                for(let i = 1; i < text.length; i++){
                    let newCourseOffering = {};
                    let currCourse = text[i].split(",");
                    newCourseOffering.department = currCourse[0];
                    newCourseOffering.semester = currCourse[3];
                    newCourseOffering.year = currCourse[4];
                    let timeSplit = currCourse[5].split(" ");
                    let times = timeSplit[1].split("-");
                    newCourseOffering.start_time = times[0];
                    newCourseOffering.end_time = times[1];
                    courseOfferingsArr.push(newCourseOffering);
                }  
                console.log(courseOfferingsArr);
            }
            reader.readAsText(file);
        },
        loadGradesFile(){

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