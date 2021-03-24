import { DegreeRequirement, Student } from '../models/index.js'
import { Router } from 'express'

import { create as createLogger } from '../utils/logger.js'

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
    const { studentData } = req.body
    const { reqVersionSem, reqVersionYear } = studentData

    const reqID = await DegreeRequirement.find(
      {
        reqVersionSem, reqVersionYear
      }).exec()

    delete studentData.reqVersionSem
    delete studentData.reqVersionYear

    if (reqID !== null) {
      studentData['reqID'] = reqID._id
    }

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


export default router
