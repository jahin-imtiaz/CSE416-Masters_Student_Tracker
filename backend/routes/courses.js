import { Course } from '../models/index.js'
import { Router } from 'express'

import { create as createLogger } from '../utils/logger.js'

const logger = createLogger('routes:courses')

let router = Router()

router.get('/', async (req, res, next) => {
  try {
    const courses = await Course.find({}, {}).exec()
    res.send(courses)
  } catch (err) {
    logger.error(err)
    next(err)
  }
})

router.post('/add', async (req, res, next) => {
  try {
    const { courseData } = req.body
    const newCourse = await Course.findOneAndUpdate(
      {
        department: courseData.department,
        course_name: courseData.course_name,
        course_num: courseData.course_num
      },
      {
        ...courseData
      },
      {
        upsert: true,
        new: true
      }
    ).exec()
    // const newCourse = new Course({
    //   ...courseData
    // })
    // await newCourse.save()
    logger.info(`Upserted course ${JSON.stringify(newCourse)}`)
    res.send(newCourse)
  } catch (err) {
    logger.error(err)
    next(err)
  }
})

router.post('/add-many', async (req, res, next) => {
  try {
    const depts = req.body

    let count = 0

    for (const [dept, deptObj] of Object.entries(depts)) {
      for (const [course, courseObj] of Object.entries(deptObj.courses)) {
        let courseData = {
          department: dept,
          course_name: courseObj.courseName,
          course_num: courseObj.courseNum,
          credits: courseObj.credits,
          description: courseObj.description,
          prerequisites: courseObj.prereqs
        }

        const newCourse = await Course.findOneAndUpdate(
          {
            department: courseData.department,
            course_name: courseData.course_name,
            course_num: courseData.course_num
          },
          {
            ...courseData
          },
          {
            upsert: true,
            new: true
          }
        ).exec()

        if (newCourse) count++
      }
    }

    // const newCourse = new Course({
    //   ...courseData
    // })
    // await newCourse.save()
    logger.info(`Upserted ${count} courses`)
  } catch (err) {
    logger.error(err)
    next(err)
  }
})

router.get('/getCourseByDepartment', async (req, res, next) => {
  try {
    let department = req.query.department
    const courses = await Course.find({ department: department }, {}).exec()
    res.send(courses)
  } catch (err) {
    logger.error(err)
    next(err)
  }
})

router.get('/getCourseByNameNumber', async (req, res, next) => {
  try {
    let name = req.query.name
    let number = req.query.number
    const course = await Course.findOne(
      { department: name, course_num: number },
      {}
    ).exec()
    res.send(course)
  } catch (err) {
    logger.error(err)
    next(err)
  }
})

export default router
