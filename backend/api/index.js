import cors from 'cors'
import compression from 'compression'
import express from 'express'
import { students, courses, courseplans, courseofferings, requirements } from '../routes/index.js'
import { create as createLogger } from '../utils/logger.js'

const { NODE_ENV, BACKEND_API_PORT } = process.env

const logger = createLogger('api')

export default class Api {
  constructor (app) {
    // app.set('trust proxy', 1)
    app.use(cors())
    app.use(compression())
    app.use(express.json({ limit: '50mb' }))
    app.use(express.urlencoded({ extended: true }))
    app.use('/students', students)
    app.use('/courses', courses)
    app.use('/courseplans', courseplans)
    app.use('/requirements', requirements)
    app.use('/courseofferings', courseofferings)
    app.use(this.handleError)
    this.app = app
  }

  handleError = ((err, req, res, next) => {
    if (err.isBoom) {
      return res.status(err.output.statusCode).json(err.output.payload)
    } else {
      next(err)
    }
  })

  handleListen = () => {
    logger.info(`Listening on port ${BACKEND_API_PORT}!`)
  }

  start = () => {
    this.app.listen(BACKEND_API_PORT, this.handleListen)
  }
}