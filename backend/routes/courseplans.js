import { CoursePlan } from '../models/index.js'
import { Router } from 'express'

import { create as createLogger } from '../utils/logger.js'

const logger = createLogger('routes:courseplans')

let router = Router()

router.get('/', async (req, res, next) => {
    try {
        const courses = await CoursePlan.find({}, {}).exec()
        res.send(courses)
    } catch (err) {
        logger.error(err)
        next(err)
    }
})

router.post('/add', async (req, res, next) => {
    try {
        const { coursePlanData } = req.body
        const newCoursePlan = new CoursePlan({
            ...coursePlanData
        })
        await newCoursePlan.save()
        logger.info(`Added course plan ${JSON.stringify(newCoursePlan)}`)
        res.send(newCoursePlan)
    } catch (err) {
        logger.error(err)
        next(err)
    }
})

router.post('/add-many', async (req, res, next) => {
    try {
      let coursePlans = req.body
  
      let newCoursePlans = []
  
      for (let coursePlanData of coursePlans) {
        const newCoursePlan = new CoursePlan({
          ...coursePlanData
        })
        await newCoursePlan.save()
        logger.info(`Added course plan ${JSON.stringify(newCoursePlan)}`)
        
        newCoursePlans.push(newCoursePlan)
      }
  
      res.send(newCoursePlans)
    } catch (err) {
      logger.error(err)
      next(err)
    }
})

export default router
