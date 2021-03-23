import dotenv from 'dotenv'
import path from 'path'

const env = process.env.NODE_ENV === 'production' ? '.env' : '.env'

dotenv.config({
  silent: true,
  path: path.resolve(process.cwd(), env)
})
