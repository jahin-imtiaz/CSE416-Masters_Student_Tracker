import { CourseOffering, Course} from '../models/index.js'
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

router.post('/add-many', async (req, res, next) => {
  try {
    let courseOfferings = req.body

    let newCourseOfferings = []

    for (let courseOffering of courseOfferings) {
      console.log(courseOffering)
      
      const course = {department: courseOffering.department, course_name: courseOffering.department, course_num: courseOffering.course_num}
      console.log(course);
      let retCourse = await Course.findOne({department: 'AMS'}).exec();
      console.log(retCourse)
      

      // const newCourseOffer = await CourseOffering.findOneAndUpdate(
      //   course, 
      //   {
      //     ...courseOffering
      //   }, {
      //     upsert: true,
      //     new: true
      //   }
      // )
      // logger.info(`Upserted course offerings ${JSON.stringify(newCourseOffer)}`)
      
      // newCourseOfferings.push(newCourseOffer)
    }

    res.send(newCourseOfferings)
  } catch (err) {
    logger.error(err)
    next(err)
  }
})

export default router
