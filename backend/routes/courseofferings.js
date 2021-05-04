import { CourseOffering, Course, CoursePlan } from '../models/index.js'
import { Router } from 'express'

import { create as createLogger } from '../utils/logger.js'
import mongoose from 'mongoose'

const logger = createLogger('routes:offerings')

let router = Router()

router.get('/', async (req, res, next) => {
  try {
    const offerings = await CourseOffering.find({}, {}).exec()
    res.send(offerings)
  } catch (err) {
    logger.error(err)
    next(err)
  }
})

router.post('/add', async (req, res, next) => {
  try {
    const { offeringData } = req.body
    const newOffering = new CourseOffering({
      ...offeringData
    })
    await newOffering.save()
    logger.info(`Added offering ${JSON.stringify(newOffering)}`)
    res.send(newOffering)
  } catch (err) {
    logger.error(err)
    next(err)
  }
})

// router.post('/add-many', async (req, res, next) => {
//   try {
//     let courseOfferings = req.body
//     // remove existing course offerings for semester(s) covered

//     let semesters = courseOfferings.map((o) => o.semester)
//     let years = courseOfferings.map((o) => o.year)

//     let existingOfferings = await CourseOffering.deleteMany({
//       semester: { $in: semesters },
//       year: { $in: years }
//     })
//     logger.info(
//       `Removed existing offerings ${JSON.stringify(existingOfferings)}`
//     )

//     // add new course offerings
//     let newCourseOfferings = []
//     let allInvalidCoursePlans = []

//     for (let courseOffering of courseOfferings) {
//       const course = {
//         department: courseOffering.department,
//         course_name: courseOffering.department,
//         course_num: courseOffering.course_num
//       }
//       let retCourse = await Course.findOne(course).exec()
//       const newCourseOffer = await CourseOffering.findOneAndUpdate(
//         {
//           courseID: retCourse,
//           section: courseOffering.section,
//           semester: courseOffering.semester,
//           year: courseOffering.year
//         },
//         {
//           ...courseOffering,
//           courseID: retCourse
//         },
//         {
//           upsert: true,
//           new: true
//         }
//       )
//       logger.info(`Upserted course offerings ${JSON.stringify(newCourseOffer)}`)
//       newCourseOfferings.push(newCourseOffer)

//       // TODO: invalid course offerings

//       // get all student courseplans taking invalid courses in courseOfferings file
//       // Invalid CoursePlans match dept, course_name, course_num, semester, and year
//       const invalidCoursePlans = await CoursePlan.updateMany(
//         {
//           department: courseOffering.department,
//           course_num: courseOffering.course_num,
//           semester: courseOffering.semester,
//           year: courseOffering.year
//         },
//         {
//           invalid: true
//         },
//         {
//           new: true
//         }
//       ).exec()
//       allInvalidCoursePlans.concat(invalidCoursePlans)
//     }

//     res.send({ newCourseOfferings, allInvalidCoursePlans })
//   } catch (err) {
//     logger.error(err)
//     next(err)
//   }
// })

router.get('/findAllOfferingOfCourse', async (req, res, next) => {
  try {
    let name = req.query.name.split(' ')[0]
    let num = req.query.name.split(' ')[1]

    let semester = req.query.semester
    let year = req.query.year
    let offeredCoursesInSemYear = await CourseOffering.find(
      { semester: semester, year: year },
      {}
    )
      .populate('courseID')
      .exec()

    let courses = offeredCoursesInSemYear.filter(
      (courseOffering) =>
        courseOffering.courseID.course_name === name &&
        courseOffering.courseID.course_num === num
    )

    res.send(courses)
  } catch (err) {
    logger.error(err)
    next(err)
  }
})

router.post('/add-many', async (req, res, next) => {
  try {
    let courseOfferings = req.body

    let semestersAndYearsCovered = courseOfferings.map(
      (o) => o.semester + ' ' + o.year
    )
    semestersAndYearsCovered = Array.from(new Set(semestersAndYearsCovered))

    let offeredCoursesInSemYearMap = {}
    for (let semYear of semestersAndYearsCovered) {
      offeredCoursesInSemYearMap[semYear] = []
    }

    for (let courseOffering of courseOfferings) {
      let semyr = courseOffering.semester + ' ' + courseOffering.year
      offeredCoursesInSemYearMap[semyr].push(
        courseOffering.department + ' ' + courseOffering.course_num
      )
    }

    // delete all course offerings that are covered by each semester year combination
    for (let semesterYear of semestersAndYearsCovered) {
      let sem = semesterYear.split(' ')[0]
      let yr = semesterYear.split(' ')[1]

      let existingOfferings = await CourseOffering.deleteMany({
        semester: sem,
        year: yr
      })
      logger.info(
        `Removed existing offerings ${JSON.stringify(existingOfferings)}`
      )
    }

    // add new course offerings
    let newCourseOfferings = []
    for (let courseOffering of courseOfferings) {
      const course = {
        department: courseOffering.department,
        course_name: courseOffering.department,
        course_num: courseOffering.course_num
      }
      let retCourse = await Course.findOne(course).exec()
      const newCourseOffer = await CourseOffering.findOneAndUpdate(
        {
          courseID: retCourse,
          section: courseOffering.section,
          semester: courseOffering.semester,
          year: courseOffering.year
        },
        {
          ...courseOffering,
          courseID: retCourse
        },
        {
          upsert: true,
          new: true
        }
      )
      logger.info(`Upserted course offerings ${JSON.stringify(newCourseOffer)}`)
      newCourseOfferings.push(newCourseOffer)
    }

    // get all student courseplans taking invalid courses in courseOfferings file
    // Invalid CoursePlans match dept, course_name, course_num, semester, and year
    let allInvalidCoursePlans = []
    let allStudentIDWithInvalidPlan = []
    for (let semesterYear of semestersAndYearsCovered) {
      let sem = semesterYear.split(' ')[0]
      let yr = semesterYear.split(' ')[1]

      let coursesOfferedInSemYr = offeredCoursesInSemYearMap[sem + ' ' + yr]

      // find all courseplan that is covered by this sem and yr
      let coursePlans = await CoursePlan.find(
        { semester: sem, year: yr },
        {}
      ).exec()
      // get list of all the coursePlan ID where department+course_num is not in the offered list
      // get list of all student IDs related to those plans
      let invalidCoursePlans = coursePlans.map(
        (plan) =>
          !coursesOfferedInSemYr.includes(
            plan.department + ' ' + plan.course_num
          )
      )
      let invalidCoursePlanIDs = []
      for (let invalidCoursePlan of invalidCoursePlans) {
        allStudentIDWithInvalidPlan.push(invalidCoursePlan.sbu_id)
        allInvalidCoursePlans.push(invalidCoursePlan)
        invalidCoursePlanIDs.push(invalidCoursePlan._id)
      }
      // update all plans with those ID's to become invalid
      await CoursePlan.updateMany(
        {
          _id: { $in: invalidCoursePlanIDs }
        },
        {
          invalid: true
        },
        {
          new: true
        }
      ).exec()
    }
    allStudentIDWithInvalidPlan = Array.from(
      new Set(allStudentIDWithInvalidPlan)
    )

    res.send({ allStudentIDWithInvalidPlan, allInvalidCoursePlans })
  } catch (err) {
    logger.error(err)
    next(err)
  }
})

export default router
