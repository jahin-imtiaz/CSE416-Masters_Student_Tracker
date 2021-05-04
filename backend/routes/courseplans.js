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
    let coursePlanData = req.body

    const newCoursePlan = await CoursePlan.findOneAndUpdate(
      {
        sbu_id: coursePlanData.sbu_id,
        course_num: coursePlanData.course_num,
        department: coursePlanData.department
      },
      {
        ...coursePlanData
      },
      {
        upsert: true,
        new: true
      }
    )
    // const newCoursePlan = new CoursePlan({
    //     ...coursePlanData
    // })
    // await newCoursePlan.save()
    logger.info(`Upserted course plan ${JSON.stringify(newCoursePlan)}`)
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
      const newCoursePlan = await CoursePlan.findOneAndUpdate(
        {
          sbu_id: coursePlanData.sbu_id,
          course_num: coursePlanData.course_num,
          department: coursePlanData.department
        },
        {
          ...coursePlanData
        },
        {
          upsert: true,
          new: true
        }
      )
      // const newCoursePlan = new CoursePlan({
      //   ...coursePlanData
      // })
      // await newCoursePlan.save()
      logger.info(`Upserted course plan ${JSON.stringify(newCoursePlan)}`)

      newCoursePlans.push(newCoursePlan)
    }

    res.send(newCoursePlans)
  } catch (err) {
    logger.error(err)
    next(err)
  }
})

router.get('/getCoursePlanBySbuID', async (req, res, next) => {
  try {
    let sbuID = req.query.id
    console.log(sbuID)
    const coursePlan = await CoursePlan.find({ sbu_id: sbuID }, {}).exec()
    console.log(sbuID, coursePlan)
    res.send(coursePlan)
  } catch (err) {
    logger.error(err)
    next(err)
  }
})

// router.get('/:id', async (req, res, next) => {
//   try {
//     console.log('id: ' + req.params.id)
//     res.send(coursePlan)
//   } catch (err) {
//     logger.error(err)
//     next(err)
//   }
// })

export default router
