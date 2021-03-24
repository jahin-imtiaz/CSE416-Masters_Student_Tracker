import { DegreeRequirement, Student } from '../models/index.js'
import { Router } from 'express'

import { create as createLogger } from '../utils/logger.js'

const logger = createLogger('routes:students')

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
    let studentData = req.body

      console.log(studentData)
    const newStudent = new Student({
      ...studentData
    })
    await newStudent.save()
    logger.info(`Added student ${JSON.stringify(newStudent)}`)
    res.send(newStudent)
  } catch (err) {
    logger.error(err)
    next(err)
  }
})

router.post('/add-many', async (req, res, next) => {
  try {
    let students = req.body

    let newStudents = []

    for (let studentData of students) {
      const newStudent = new Student({
        ...studentData
      })
      await newStudent.save()
      logger.info(`Added student ${JSON.stringify(newStudent)}`)
      
      newStudents.push(newStudent)
    }

    res.send(newStudents)
  } catch (err) {
    logger.error(err)
    next(err)
  }
})


export default router
