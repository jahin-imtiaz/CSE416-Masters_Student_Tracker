<template>
  <div class="hello">
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
    <label class="text-reader">
      <input type="file" @change="loadTextFromFile">
  </label>
  </div>
</template>

<script>
export default {
  name: 'hello-vno',
  props: {
    msg: String,
  },

  methods: {
    loadTextFromFile(ev) {
      const file = ev.target.files[0];
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
    }
  }
};
</script>

<style>
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