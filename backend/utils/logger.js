import riverpig from 'riverpig'
import debug from 'debug'
import through2 from 'through2'

let outputStream = process.stdout
const logStream = through2()
logStream.pipe(outputStream)

const { NODE_ENV } = process.env

export class Logger {
  constructor (namespace, config) {
    this.river = riverpig(namespace, config)
    this.tracer = this.river.trace || debug(namespace + ':trace')
  }

  info (msg, ...elements) {
    if (NODE_ENV === 'test') { return }
    this.river.info(msg, ...elements)
  }

  warn (msg, ...elements) {
    if (NODE_ENV === 'test') { return }
    this.river.warn(msg, ...elements)
  }

  error (msg, ...elements) {
    if (NODE_ENV === 'test') { return }
    this.river.error(msg, ...elements)
  }

  debug (msg, ...elements) {
    if (NODE_ENV === 'test') { return }
    this.river.debug(msg, ...elements)
  }

  trace (msg, ...elements) {
    if (NODE_ENV === 'test') { return }
    this.tracer(msg, ...elements)
  }
}

export const createRaw = (namespace) => {
  return new Logger(namespace, {
    stream: logStream
  })
}
export const create = (namespace) => createRaw('backend-api:' + namespace)

export const setOutputStream = (newOutputStream) => {
  logStream.unpipe(outputStream)
  logStream.pipe(newOutputStream)
  outputStream = newOutputStream
}
