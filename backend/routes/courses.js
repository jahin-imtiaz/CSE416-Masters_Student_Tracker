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
    const newCourse = new Course({
      ...courseData
    })
    await newCourse.save()
    logger.info(`Added course ${JSON.stringify(newCourse)}`)
    res.send(newCourse)
  } catch (err) {
    logger.error(err)
    next(err)
  }
})

export default router
