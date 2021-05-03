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

router.post('/add-many', async (req, res, next) => {
  try {
    let courseOfferings = req.body
    // remove existing course offerings for semester(s) covered

    let semesters = courseOfferings.map((o) => o.semester)
    let years = courseOfferings.map((o) => o.year)

    let existingOfferings = await CourseOffering.deleteMany({
      semester: { $in: semesters },
      year: { $in: years }
    })
    logger.info(
      `Removed existing offerings ${JSON.stringify(existingOfferings)}`
    )

    // add new course offerings
    let newCourseOfferings = []
    let allInvalidCoursePlans = []

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

      // TODO: invalid course offerings

      // get all student courseplans taking invalid courses in courseOfferings file
      // Invalid CoursePlans match dept, course_name, course_num, semester, and year
      const invalidCoursePlans = await CoursePlan.updateMany(
        {
          department: courseOffering.department,
          course_num: courseOffering.course_num,
          semester: courseOffering.semester,
          year: courseOffering.year
        },
        {
          invalid: true
        },
        {
          new: true
        }
      ).exec()
      allInvalidCoursePlans.concat(invalidCoursePlans)
    }

    res.send({ newCourseOfferings, allInvalidCoursePlans })
  } catch (err) {
    logger.error(err)
    next(err)
  }
})

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

export default router
