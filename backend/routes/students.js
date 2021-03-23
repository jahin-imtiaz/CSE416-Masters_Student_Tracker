import { Course, CourseOffering, DegreeRequirement, Student } from '../models'
import { Router } from 'express'

import { create as createLogger } from '../utils/logger'

const logger = createLogger('routes:student')

let router = Router()

router.get('/', async (req, res, next) => {
  try {
    const students = await Student.find({}, {}).exec()
    res.send(students)
  } catch (err) {
    logger.error(err)
    next(err)
  }
})

router.post('/add', async (req, res, next) => {
  try {
    const { studentData } = req.params
    const newStudent = Student.findOneAndUpdate({sbu_id: studentData.sbu_id},
      {
        ...studentData
      },
      {
        upsert: true, new: true
      }).exec()
    res.send(newStudent)
  } catch (err) {
    logger.error(err)
    next(err)
  }
})


export default router
