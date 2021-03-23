import './env'
import Api from './api'
import express from 'express'
import mongoose from 'mongoose'
import { create as createLogger } from './utils/logger'

const logger = createLogger('index')

const { MONGO_URI } = process.env

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true, useUnifiedTopology: true })

// Mongo connection successful
mongoose.connection.on('connected', () => {
  logger.info(`Mongoose default connection open to ${MONGO_URI}`)
})

// Mongo connection throws an error
mongoose.connection.on('error', console.error.bind(console, 'Mongoose default connection error:'))

// Mongo connection is disconnected
mongoose.connection.on('disconnected', () => {
  logger.info('Mongoose default connection disconnected')
})

// Close the connection if the node process is terminated
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    logger.warn('Mongoose default connection disconnected through app termination')
  })

  process.exit(0)
})

const app = express()
const api = new Api(app)
api.start()
