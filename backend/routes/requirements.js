import { DegreeRequirement } from '../models/index.js'
import { Router } from 'express'

import { create as createLogger } from '../utils/logger.js'

const logger = createLogger('routes:requirements')

let router = Router()

router.get('/', async (req, res, next) => {
  try {
    const requirements = await DegreeRequirement.find({}, {}).exec()
    res.send(requirements)
  } catch (err) {
    logger.error(err)
    next(err)
  }
})

router.post('/add', async (req, res, next) => {
  try {
    const reqData = req.body
    const newReq = await DegreeRequirement.findOneAndUpdate(
      {
        department: reqData.department,
        reqSem: reqData.reqSem,
        reqYear: reqData.reqYear
      },
      {
        ...reqData
      },
      {
        upsert: true,
        new: true
      }
    ).exec()
    // const newReq = new DegreeRequirement({
    //   ...reqData
    // })
    // await newReq.save()
    logger.info(`Added req ${JSON.stringify(newReq)}`)
    res.send(newReq)
  } catch (err) {
    logger.error(err)
    next(err)
  }
})

router.get('/getreq', async (req, res, next) => {
  try {
    const reqData = req.query
    const newReq = await DegreeRequirement.findOne({
      department: reqData.department,
      reqSem: reqData.reqSem,
      reqYear: reqData.reqYear
    }).exec()

    logger.info(`Got req ${JSON.stringify(newReq)}`)
    res.send(newReq)
  } catch (err) {
    logger.error(err)
    next(err)
  }
})

export default router
