import axios from 'axios'
const { VUE_APP_BACKEND_API } = process.env

export default class Requirements {
  constructor() {}

  async getStudent(studentID) {
    return await axios
      .get(`${VUE_APP_BACKEND_API}/coursePlans/getCoursePlanBySbuID`, {
        params: {
          id: studentID
        }
      })
      .then((response) => response.data)
      .catch((err) => {
        console.log(err)
      })
  }

  async getStudentCoursePlans(studentID) {
    return await axios
      .get(`${VUE_APP_BACKEND_API}/coursePlans/getCoursePlanBySbuID`, {
        params: {
          id: studentID
        }
      })
      .then((response) => response.data)
      .catch((err) => {
        console.log(err)
      })
  }

  async getStudentReqVersion(department, reqSem, reqYear) {
    return await axios
      .get(`${VUE_APP_BACKEND_API}/requirements/getReq`, {
        params: {
            department,
            reqSem,
            reqYear
        }
      })
      .then((response) => response.data)
      .catch((err) => {
        console.log(err)
      })
  }

  getCurrentCredits(plans) {

    let count = 0
    for (let plan of plans) {
      if (plan.grade && plan.grade !== "") {
        let res = await axios
          .get(`${VUE_APP_BACKEND_API}/courses/getCourseByNameNumber`, {
            params: {
                name: plan.department,
                number: plan.course_num
            }
          })
          .then((response) => response.data)
          .catch((err) => {
            console.log(err)
          })
        if (res && res.data && res.data.credits) {
          let creditsNum = 0

          // for courses with variable credits, assume the course was taken for 3 credits if 3 is in the allowed range (this is the most common case), otherwise assume it was taken for the minimum number of credits. [2021-04-24 added this]
          if (res.data.credits.includes('-')) {
            let creditsRange = res.data.split('-')
            console.log('CREDITS RANGE', creditsRange)
            if (parseInt(creditsRange[1]) >= 3) {
              count += 3
            } else {
              count += parseInt(creditsRange[0])
            }
          } else {
            if (res.data.credits == "") {
              count += 3
            } else {
              count += parseInt(res.data.credits)
            }
          }
        }
      }
    }
    
    return count
  }

  gradeToPoints(grade) {
    switch (grade) {
      case "A":
        return 4.0
      case "A-":
        return 3.67
      case "B+":
        return 3.33
      case "B":
        return 3.0
      case "B-":
        return 2.67
      case "C+":
        return 2.33
      case "C":
        return 2
      case "C-":
        return 1.67
      case "D+":
        return 1.33
      case "D":
        return 1.00
      case "F":
        return 0.00
      case "Q":
        return 0.00
      default:
        return 0.00
    }
  }

  getGPA (plans) {

    let credits = 0
    let points = 0
    for (let plan of plans) {
      if (plan.grade && plan.grade !== "") {
        let res = await axios
          .get(`${VUE_APP_BACKEND_API}/courses/getCourseByNameNumber`, {
            params: {
                name: plan.department,
                number: plan.course_num
            }
          })
          .then((response) => response.data)
          .catch((err) => {
            console.log(err)
          })
        if (res && res.data && res.data.credits) {
          let creditsNum = 0

          // for courses with variable credits, assume the course was taken for 3 credits if 3 is in the allowed range (this is the most common case), otherwise assume it was taken for the minimum number of credits. [2021-04-24 added this]
          if (res.data.credits.includes('-')) {
            let creditsRange = res.data.split('-')
            console.log('CREDITS RANGE', creditsRange)
            if (parseInt(creditsRange[1]) >= 3) {
              credits += 3
              points += 3 * creditsToPoints(plan.grade)
            } else {
              credits += parseInt(creditsRange[0])
              points += parseInt(creditsRange[0]) * creditsToPoints(plan.grade)
            }
          } else {
            if (res.data.credits == "") {
              credits += 3
              points += 3 * creditsToPoints(plan.grade)
            } else {
              credits += parseInt(res.data.credits)
              points += parseInt(res.data.credits) * creditsToPoints(plan.grade)
            }
          }
        }
      }
    }
    
    return (points/credits).toFixed(2)
  }

  checkCSE(reqObj, plans, track) {

    let state = reqObj
    let tableState = []

    if (state.min_credit) {
      let curr_credits = this.getCurrentCredits(plans)
      let satisfied = state.min_credit <= curr_credits
      let tableReq = {
        name: "Min. Credits",
        progress: curr_credits + '/' + state.min_credit + ' credits',
        status: satisfied
      }
      tableState.push(tableReq)
    }

    if (state.gpa_req) {

      let curr_gpa = this.getGPA(plans)
      let satisfied = state.gpa_req <= curr_gpa
      let tableReq = {
        name: "GPA",
        progress: 'Min. GPA: ' + state.gpa_req + '/ Curr. GPA: ' + curr_gpa,
        status: satisfied
      }
      tableState.push(tableReq)
    }

    let studentCoursePlansNames = studentCoursePlans.map(
      (coursePlan) => coursePlan.department + ' ' + coursePlan.course_num
    ).concat(coursesSelected)

    if (state.breadth_req) {
      for (let breadth of state.breadth_req) {
        tableReq = {
          name: 'Breadth - ' + breadth.breadth,
          progress: 'Taken: | Min. course: ' + breadth.min_course,
          status: false
        }
        let breadthCourses = []
        let count = 0
        for (let course of breadth) {
          let breadthCourse = course.department + ' ' + course.course_num
          if (studentCoursePlansNames.includes(breadthCourse)) {
            breadthCourses.push(breadthCourse)
            count++
            if (count >= parseInt(breadth.min_course)) {
              tableReq.satisfied = true
              break
            }
          }
        }
        tableReq.progress = 'Taken: ' + breadthCourses.join() + ' | Min. course: ' + breadth.min_course
        tableState.push(tableReq)
      }
    }

    if (track && state.track_req && state.track_req[track]) {

      let tableReq = {
        name: 'Track - ' + track,
        progress: '0/8 core, 0/1 project',
        status: false
      }

      // check track requirements
      if (track === 'Special Project') {
        let lectureCount = 0
        let projectCount = 0
        let project = false
        for (let course of studentCoursePlansNames) {
          if (
            course.split(' ')[0] === 'CSE' &&
            course.split(' ')[1] === '522'
          ) {
            projectCount += 1
            project = true
          } else if (course.split(' ')[0] === 'CSE') {
            lectureCount += 1
          }
        }
        tableReq.progress = lectureCount + '/8 core, ' + projectCount + '/1 project'
        if (lectureCount >= 8 && project === true) {
          tableReq.status = true
        }
      } else if (track === 'Advanced Project') {
        let lectureCount = 0
        let projectCount = 0
        let project1 = false
        let project2 = false
        for (let course of studentCoursePlansNames) {
          if (
            course.split(' ')[0] === 'CSE' &&
            course.split(' ')[1] === '523'
          ) {
            projectCount += 1
            project1 = true
          } else if (
            course.split(' ')[0] === 'CSE' &&
            course.split(' ')[1] === '524'
          ) {
            projectCount += 1
            project2 = true
          } else if (course.split(' ')[0] === 'CSE') {
            lectureCount += 1
          }
        }
        tableReq.progress = lectureCount + '/7 core, ' + projectCount + '/2 project'
        if (lectureCount >= 7 && project1 === true && project2 === true) {
          tableReq.status = true
        }
      } else if (track === 'Thesis') {
        let lectureCount = 0
        let projectCount = 0
        let project = false
        for (let course of studentCoursePlansNames) {
          if (
            course.split(' ')[0] === 'CSE' &&
            course.split(' ')[1] === '599'
          ) {
            projectCount += 1
            project = true
          } else if (course.split(' ')[0] === 'CSE') {
            lectureCount += 1
          }
        }
        tableReq.progress = lectureCount + '/6 core, ' + projectCount + '/1 project'
        if (lectureCount >= 6 && project === true) {
          tableReq.status = true
        }
      }

      tableState.push(tableReq)
    }
  
    // return the state
    return tableState

  }



  getDegreeRequirementState(studentID, major, track, coursesSelected) {

    let student = await this.getStudent(studentID)
    let studentCoursePlans = (await this.getStudentCoursePlan(studentID)).data

    let degReq = await this.getStudentReqVersion(student.reqVersion.department, student.reqVersion.reqSem, student.reqVersion.reqYear)

    let state = degReq.requirements
    console.log(state)

    switch (degReq.department) {
      case "CSE":
        state = this.checkCSE(degReq.requirements, studentCoursePlans, student.reqVersion.track)  
        break
      case "AMS":
        state = this.checkAMS(degReq.requirements, studentCoursePlans, student.reqVersion.track)
        break
      case "ESE":
        state = this.checkESE(degReq.requirements, studentCoursePlans, student.reqVersion.track)
        break
      case "BMI":
        state = this.checkBMI(degReq.requirements, studentCoursePlans, student.reqVersion.track)
        break
      default:
        break      
    }

    return state
  }
}
