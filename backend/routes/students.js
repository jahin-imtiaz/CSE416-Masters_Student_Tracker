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
    const studentId = studentData._id.sbu_id
    delete studentData._id

    const newStudent = await Student.findOneAndUpdate(
      {
        '_id.sbu_id': studentId
      },
      {
        ...studentData
      },
      {
        upsert: true,
        new: true
      }
    ).exec()
    // const newStudent = new Student({
    //   ...studentData
    // })
    // await newStudent.save()
    logger.info(`Upserted student ${JSON.stringify(newStudent)}`)
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
      console.log(studentData)
      const studentId = studentData['_id.sbu_id']
      delete studentData._id

      const newStudent = await Student.findOneAndUpdate(
        {
          '_id.sbu_id': studentId
        },
        {
          ...studentData
        },
        {
          upsert: true,
          new: true
        }
      )
      // const newStudent = new Student({
      //   ...studentData
      // })
      // await newStudent.save()
      logger.info(`Upserted student ${JSON.stringify(newStudent)}`)

      newStudents.push(newStudent)
    }

    res.send(newStudents)
  } catch (err) {
    logger.error(err)
    next(err)
  }
})

router.post('/delete-all', async (req, res, next) => {
  try {
    const deleteAll = await Student.deleteMany({})
    console.log(deleteAll)
    res.send(deleteAll)
  } catch (err) {
    logger.error(err)
    next(err)
  }
})

router.get('/getOneByID', async (req, res, next) => {
  try {
    let studentId = req.query.id

    const student = await Student.findOne(
      { '_id.sbu_id': studentId },
      {}
    ).exec()

    console.log(studentId, student)
    res.send(student)
  } catch (err) {
    logger.error(err)
    next(err)
  }
})

router.get('/getManyByID', async (req, res, next) => {
  try {
    let studentIds = req.query.studentIds

    const students = await Student.find(
      { '_id.sbu_id': { $in: studentIds } },
      {}
    ).exec()

    console.log(studentId, student)
    res.send(students)
  } catch (err) {
    logger.error(err)
    next(err)
  }
})

export default router
