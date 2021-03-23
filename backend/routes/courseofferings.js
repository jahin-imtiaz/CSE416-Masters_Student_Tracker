import { CourseOffering } from '../models/index.js'
import { Router } from 'express'

import { create as createLogger } from '../utils/logger.js'

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

export default router
