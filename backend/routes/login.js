import { DegreeRequirement, Student } from '../models/index.js'
import { Router } from 'express'

import { create as createLogger } from '../utils/logger.js'

const logger = createLogger('routes:students')

const { GPD_EMAIL, GPD_PWD } = process.env

let router = Router()

router.post('/', async (req, res, next) => {
  try {
    let form = req.body

    let authRes = {
      GPD: false,
      StudentID: ''
    }

    if (form.email == GPD_EMAIL && form.password == GPD_PWD) {
      authRes.GPD = true
      res.send(authRes)
    } else {
      const student = await Student.findOne({
        email: form.email,
        password: form.password
      })
      if (student) {
        authRes.StudentID = student._id.sbu_id
        res.send(authRes)
      } else {
        res.status(400).send('Login failed')
      }
    }
  } catch (err) {
    logger.error(err)
    next(err)
  }
})

export default router
