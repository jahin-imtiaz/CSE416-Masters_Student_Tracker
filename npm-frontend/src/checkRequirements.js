import axios from 'axios'
const { VUE_APP_BACKEND_API } = process.env

export default class Requirements {
  constructor() {}

  async getStudent(studentID) {
    return await axios
      .get(`${VUE_APP_BACKEND_API}/students/getOneByID`, {
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

  async getCurrentCredits(plans) {
    let count = 0
    for (let plan of plans) {
      if (plan.grade && plan.grade !== '') {
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
        if (res && res.credits) {
          // for courses with variable credits, assume the course was taken for 3 credits if 3 is in the allowed range (this is the most common case), otherwise assume it was taken for the minimum number of credits. [2021-04-24 added this]
          if (res.credits.includes('-')) {
            let creditsRange = res.split('-')
            console.log('CREDITS RANGE', creditsRange)
            if (parseInt(creditsRange[1]) >= 3) {
              count += 3
            } else {
              count += parseInt(creditsRange[0])
            }
          } else {
            if (res.credits == '') {
              count += 3
            } else {
              count += parseInt(res.credits)
            }
          }
        }
      }
    }

    return count
  }

  gradeToPoints(grade) {
    switch (grade) {
      case 'A':
        return 4.0
      case 'A-':
        return 3.67
      case 'B+':
        return 3.33
      case 'B':
        return 3.0
      case 'B-':
        return 2.67
      case 'C+':
        return 2.33
      case 'C':
        return 2
      case 'C-':
        return 1.67
      case 'D+':
        return 1.33
      case 'D':
        return 1.0
      case 'F':
        return 0.0
      case 'Q':
        return 0.0
      default:
        return 0.0
    }
  }

  async getGPA(plans) {
    let credits = 0
    let points = 0
    for (let plan of plans) {
      if (plan.grade && plan.grade !== '') {
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
        if (res && res.credits) {
          // for courses with variable credits, assume the course was taken for 3 credits if 3 is in the allowed range (this is the most common case), otherwise assume it was taken for the minimum number of credits. [2021-04-24 added this]
          if (res.credits.includes('-')) {
            let creditsRange = res.split('-')
            console.log('CREDITS RANGE', creditsRange)
            if (parseInt(creditsRange[1]) >= 3) {
              credits += 3
              points += 3 * this.gradeToPoints(plan.grade)
            } else {
              credits += parseInt(creditsRange[0])
              points +=
                parseInt(creditsRange[0]) * this.gradeToPoints(plan.grade)
            }
          } else {
            if (res.credits == '') {
              credits += 3
              points += 3 * this.gradeToPoints(plan.grade)
            } else {
              credits += parseInt(res.credits)
              points += parseInt(res.credits) * this.gradeToPoints(plan.grade)
            }
          }
        }
      }
    }

    console.log(points, credits)

    return (points / credits).toFixed(2)
  }

  async checkCSE(reqObj, plans, track) {
    let state = reqObj
    let tableState = []

    if (state.min_credit) {
      let curr_credits = await this.getCurrentCredits(plans)
      let status = state.min_credit <= curr_credits
      let tableReq = {
        name: 'Min. Credits',
        progress: curr_credits + '/' + state.min_credit + ' credits',
        satisfied: status
      }
      tableState.push(tableReq)
    }

    if (state.gpa_req) {
      let curr_gpa = await this.getGPA(plans)
      let status = state.gpa_req <= curr_gpa
      let tableReq = {
        name: 'GPA',
        progress: 'Min. GPA: ' + state.gpa_req + ' | Curr. GPA: ' + curr_gpa,
        satisfied: status
      }
      tableState.push(tableReq)
    }

    let studentCoursePlansNames = plans.map(
      (coursePlan) => coursePlan.department + ' ' + coursePlan.course_num
    )
    // .concat(coursesSelected)

    if (state.breadth_req) {
      for (let breadth of state.breadth_req) {
        let tableReq = {
          name: 'Breadth - ' + breadth.breadth,
          progress: 'Taken: | Min. course: ' + breadth.min_course,
          satisfied: false
        }
        let breadthCourses = []
        let count = 0
        for (let course of breadth.courses) {
          let breadthCourse = course.department + ' ' + course.course_num
          if (studentCoursePlansNames.includes(breadthCourse)) {
            breadthCourses.push(breadthCourse)
            count += 1
            if (count >= parseInt(breadth.min_course)) {
              tableReq.satisfied = true
              break
            }
          }
        }
        tableReq.progress =
          'Taken: ' +
          breadthCourses.join() +
          ' | Min. course: ' +
          breadth.min_course
        tableState.push(tableReq)
      }
    }

    if (track && state.track_req) {
      let tableReq = {
        name: 'Track - ' + track,
        progress: '0/8 core, 0/1 project',
        satisfied: false
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
        tableReq.progress =
          lectureCount + '/8 core, ' + projectCount + '/1 project'
        if (lectureCount >= 8 && project === true) {
          tableReq.satisfied = true
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
        tableReq.progress =
          lectureCount + '/7 core, ' + projectCount + '/2 project'
        if (lectureCount >= 7 && project1 === true && project2 === true) {
          tableReq.satisfied = true
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
        tableReq.progress =
          lectureCount + '/6 core, ' + projectCount + '/1 project'
        if (lectureCount >= 6 && project === true) {
          tableReq.satisfied = true
        }
      }

      tableState.push(tableReq)
    }

    // return the state
    return tableState
  }

  async checkAMS(reqObj, plans, track) {
    let state = reqObj
    let tableState = []

    if (state.min_credit) {
      let curr_credits = await this.getCurrentCredits(plans)
      let status = state.min_credit <= curr_credits
      let tableReq = {
        name: 'Min. Credits',
        progress: curr_credits + '/' + state.min_credit + ' credits',
        satisfied: status
      }
      tableState.push(tableReq)
    }

    if (state.cum_course_gpa) {
      let curr_gpa = await this.getGPA(plans)
      let status = state.cum_course_gpa <= curr_gpa
      let tableReq = {
        name: 'GPA',
        progress:
          'Min. GPA: ' + state.cum_course_gpa + ' | Curr. GPA: ' + curr_gpa,
        satisfied: status
      }
      tableState.push(tableReq)
    }

    let studentCoursePlansNames = plans.map(
      (coursePlan) => coursePlan.department + ' ' + coursePlan.course_num
    )
    // .concat(coursesSelected)

    if (track && state.track_req) {
      let tableReq = {
        name: 'Track - ' + track,
        progress: '',
        satisfied: false
      }

      // check track requirements
      if (track === 'Computational Applied Mathematics') {
        let coreCourses = [
          'AMS 501',
          'AMS 503',
          'AMS 510',
          'AMS 526',
          'AMS 527',
          'AMS 528',
          'AMS 595'
        ]
        let electiveCourses = [
          'AMS 502',
          'AMS 530',
          'AMS 542',
          'AMS 562',
          'AMS 565',
          'AMS 566',
          'AMS 603'
        ]
        let coreCount = 0
        let electiveCount = 0
        for (let course of studentCoursePlansNames) {
          let c = course.split(' ')[0] + ' ' + course.split(' ')[1]
          if (coreCourses.includes(c)) {
            coreCount += 1
          } else if (electiveCourses.includes(c)) {
            electiveCount += 1
          }
        }
        tableReq.progress =
          coreCount + '/7 core, ' + electiveCount + '/4 elective'
        if (coreCount >= 7 && electiveCount >= 4) {
          tableReq.satisfied = true
        }
      } else if (track === 'Computational Biology') {
        let coreCourses = [
          'AMS 507',
          'AMS 510',
          'MCB 520',
          'CHE 541',
          'AMS 531',
          'AMS 532',
          'AMS 533',
          'AMS 535',
          'AMS 537',
          'AMS 539',
          'AMS 549'
        ]
        let electiveCourses = [
          'AMS 530',
          'AMS 534',
          'AMS 536',
          'CHE 528',
          'CHE 523',
          'AMS 548',
          'PHY 558'
        ]
        let coreCount = 0
        let electiveCount = 0
        for (let course of studentCoursePlansNames) {
          let c = course.split(' ')[0] + ' ' + course.split(' ')[1]
          if (coreCourses.includes(c)) {
            coreCount += 1
          } else if (electiveCourses.includes(c)) {
            electiveCount += 1
          }
        }
        tableReq.progress =
          coreCount + '/11 core, ' + electiveCount + '/3 elective'
        if (coreCount >= 11 && electiveCount >= 3) {
          tableReq.satisfied = true
        }
      } else if (track === 'Operations Research') {
        let coreCourses = [
          'AMS 510',
          'AMS 507',
          'AMS 540',
          'AMS 550',
          'AMS 553',
          'AMS 570',
          'AMS 586',
          'AMS 595'
        ]
        let electiveCourses = [
          'AMS 542',
          'AMS 544',
          'AMS 545',
          'AMS 546',
          'AMS 547',
          'AMS 552',
          'AMS 554',
          'AMS 555',
          'AMS 556',
          'AMS 570',
          'AMS 571',
          'AMS 572',
          'AMS 573',
          'AMS 575',
          'AMS 577',
          'AMS 578',
          'AMS 580',
          'AMS 582',
          'AMS 583',
          'AMS 585',
          'AMS 586',
          'AMS 511',
          'AMS 512',
          'AMS 513',
          'AMS 514',
          'AMS 515',
          'AMS 516',
          'AMS 517',
          'AMS 518',
          'AMS 519',
          'AMS 520',
          'AMS 522',
          'AMS 523'
        ]
        let coreCount = 0
        let electiveCount = 0
        for (let course of studentCoursePlansNames) {
          let c = course.split(' ')[0] + ' ' + course.split(' ')[1]
          if (coreCourses.includes(c)) {
            coreCount += 1
          } else if (electiveCourses.includes(c)) {
            electiveCount += 1
          }
        }
        tableReq.progress =
          coreCount + '/7 core, ' + electiveCount + '/4 elective'
        if (coreCount >= 7 && electiveCount >= 4) {
          tableReq.satisfied = true
        }
      } else if (track === 'Statistics') {
        let coreCourses = [
          'AMS 510',
          'AMS 507',
          'AMS 570',
          'AMS 572',
          'AMS 573',
          'AMS 578',
          'AMS 582',
          'AMS 597'
        ]
        let electiveCourses = [
          'AMS 595',
          'AMS 580',
          'AMS 586',
          'AMS 588',
          'AMS 598',
          'AMS 550',
          'AMS 560'
        ]
        let coreCount = 0
        let electiveCount = 0
        for (let course of studentCoursePlansNames) {
          let c = course.split(' ')[0] + ' ' + course.split(' ')[1]
          if (coreCourses.includes(c)) {
            coreCount += 1
          } else if (electiveCourses.includes(c)) {
            electiveCount += 1
          }
        }
        tableReq.progress =
          coreCount + '/8 core, ' + electiveCount + '/2 elective'
        if (coreCount >= 8 && electiveCount >= 2) {
          tableReq.satisfied = true
        }
      } else if (track === 'Quantitative Finance') {
        let coreCourses = [
          'AMS 510',
          'AMS 507',
          'AMS 511',
          'AMS 512',
          'AMS 513',
          'AMS 514',
          'AMS 516',
          'AMS 517',
          'AMS 518',
          'AMS 572',
          'FIN 539'
        ]
        let electiveCourses = [
          'AMS 515',
          'AMS 522',
          'AMS 523',
          'AMS 526',
          'AMS 527',
          'AMS 528',
          'AMS 530',
          'AMS 540',
          'AMS 542',
          'AMS 550',
          'AMS 553',
          'AMS 560',
          'AMS 561',
          'AMS 562',
          'AMS 569',
          'AMS 570',
          'AMS 578',
          'AMS 580',
          'AMS 588',
          'AMS 595',
          'AMS 603'
        ]
        let coreCount = 0
        let electiveCount = 0
        for (let course of studentCoursePlansNames) {
          let c = course.split(' ')[0] + ' ' + course.split(' ')[1]
          if (coreCourses.includes(c)) {
            coreCount += 1
          } else if (electiveCourses.includes(c)) {
            electiveCount += 1
          }
        }
        tableReq.progress =
          coreCount + '/11 core, ' + electiveCount + '/1 elective'
        if (coreCount >= 11 && electiveCount >= 1) {
          tableReq.satisfied = true
        }
      }
    }

    // return the state
    return tableState
  }

  async checkBMI(reqObj, plans, track) {
    let state = reqObj
    let tableState = []

    if (state.gpa_req) {
      let curr_gpa = await this.getGPA(plans)
      let status = state.gpa_req <= curr_gpa
      let tableReq = {
        name: 'GPA',
        progress: 'Min. GPA: ' + state.gpa_req + ' | Curr. GPA: ' + curr_gpa,
        satisfied: status
      }
      tableState.push(tableReq)
    }
    // .concat(coursesSelected)

    if (track) {
      // check track requirements
      if (track === 'Imaging Informatics with thesis') {
        let tableReq = {
          name: 'Track - ' + track,
          progress: '',
          satisfied: false
        }
        let curr_credits = await this.getCurrentCredits(plans)
        let status = 27 <= curr_credits
        let tableCreditReq = {
          name: 'Min. Credits',
          progress: curr_credits + '/' + 27 + ' credits',
          satisfied: status
        }

        tableReq.satisfied = 27 <= curr_credits
        tableState.push(tableCreditReq)
        tableState.push(tableReq)
      } else if (track === 'Clinical Informatics with thesis') {
        let tableReq = {
          name: 'Track - ' + track,
          progress: '',
          satisfied: false
        }
        let curr_credits = await this.getCurrentCredits(plans)
        let status = 27 <= curr_credits
        let tableCreditReq = {
          name: 'Min. Credits',
          progress: curr_credits + '/' + 27 + ' credits',
          satisfied: status
        }

        tableReq.satisfied = 27 <= curr_credits
        tableState.push(tableCreditReq)
        tableState.push(tableReq)
      }
    } else if (track === 'Translational Bioinformatics with thesis') {
      let tableReq = {
        name: 'Track - ' + track,
        progress: '',
        satisfied: false
      }
      let curr_credits = await this.getCurrentCredits(plans)
      let status = 27 <= curr_credits
      let tableCreditReq = {
        name: 'Min. Credits',
        progress: curr_credits + '/' + 27 + ' credits',
        satisfied: status
      }

      tableReq.satisfied = 27 <= curr_credits
      tableState.push(tableCreditReq)
      tableState.push(tableReq)
    } else if (track === 'Imaging Informatics with project') {
      let tableReq = {
        name: 'Track - ' + track,
        progress: '',
        satisfied: false
      }
      let curr_credits = await this.getCurrentCredits(plans)
      let status = 30 <= curr_credits
      let tableCreditReq = {
        name: 'Min. Credits',
        progress: curr_credits + '/' + 30 + ' credits',
        satisfied: status
      }

      tableReq.satisfied = 30 <= curr_credits
      tableState.push(tableCreditReq)
      tableState.push(tableReq)
    } else if (track === 'Clinical Informatics with project') {
      let tableReq = {
        name: 'Track - ' + track,
        progress: '',
        satisfied: false
      }
      let curr_credits = await this.getCurrentCredits(plans)
      let status = 30 <= curr_credits
      let tableCreditReq = {
        name: 'Min. Credits',
        progress: curr_credits + '/' + 30 + ' credits',
        satisfied: status
      }

      tableReq.satisfied = 30 <= curr_credits
      tableState.push(tableCreditReq)
      tableState.push(tableReq)
    } else if (track === 'Translational Bioinformatics with project') {
      let tableReq = {
        name: 'Track - ' + track,
        progress: '',
        satisfied: false
      }
      let curr_credits = await this.getCurrentCredits(plans)
      let status = 30 <= curr_credits
      let tableCreditReq = {
        name: 'Min. Credits',
        progress: curr_credits + '/' + 30 + ' credits',
        satisfied: status
      }

      tableReq.satisfied = 30 <= curr_credits
      tableState.push(tableCreditReq)
      tableState.push(tableReq)
    }

    // return the state
    return tableState
  }

  async checkESE(reqObj, plans, track) {
    let tableState = []

    let curr_gpa = await this.getGPA(plans)
    let status = 3.0 <= curr_gpa
    let tableReq2 = {
      name: 'GPA',
      progress: 'Min. GPA: ' + 3.0 + ' | Curr. GPA: ' + curr_gpa,
      satisfied: status
    }
    tableState.push(tableReq2)

    let curr_credits = await this.getCurrentCredits(plans)
    let status2 = 30 <= curr_credits
    let tableReq = {
      name: 'Min. Credits',
      progress: curr_credits + '/' + 30 + ' credits',
      satisfied: status2
    }
    tableState.push(tableReq)

    if (track) {
      let tableReq = {
        name: 'Track - ' + track,
        progress: '',
        satisfied: false
      }

      // check track requirements
      tableState.push(tableReq)
    }

    // return the state
    return tableState
  }

  async getDegreeRequirementState(studentID) {
    let student = await this.getStudent(studentID)
    let studentCoursePlans = await this.getStudentCoursePlans(studentID)

    let degReq = await this.getStudentReqVersion(
      student.reqVersion.department,
      student.reqVersion.reqSem,
      student.reqVersion.reqYear
    )

    let state = degReq.requirements

    switch (degReq.department) {
      case 'CSE':
        state = this.checkCSE(
          degReq.requirements,
          studentCoursePlans,
          student.reqVersion.track
        )
        break
      case 'AMS':
        state = this.checkAMS(
          degReq.requirements,
          studentCoursePlans,
          student.reqVersion.track
        )
        break
      case 'ESE':
        state = this.checkESE(
          degReq.requirements,
          studentCoursePlans,
          student.reqVersion.track
        )
        break
      case 'BMI':
        state = this.checkBMI(
          degReq.requirements,
          studentCoursePlans,
          student.reqVersion.track
        )
        break
      default:
        break
    }

    return state
  }
}
