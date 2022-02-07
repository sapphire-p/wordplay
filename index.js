import express from 'express'
import mongoose from 'mongoose'
import { port, dbURI } from './config/environment.js'

const app = express()
// const port = 4000
// const dbURI = 'mongodb://127.0.0.1:27017/wordplay-api'


const startServer = async () => {
  try {

    await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    console.log('👌 Database successfully connected')

    /* Logger middleware - logs the type and url of the request detected by the app.listen function */
    app.use((req, _res, next) => {
      console.log(`🚨 Incoming ${req.method} request to ${req.url}`)
      next()
    })

    /* Body parser middleware - if incoming request is JSON, this will convert it into JavaScript and add it to the request object in a key called 'body', accessed using req.body */
    app.use(express.json())

    /* Listen function - listens out on the specified port, will detect any requests made to the server */
    app.listen(port, () => console.log(`🚀 Express is up and running on port ${port}`))

  } catch (err) {
    console.log(err)
    console.log('❗️ Something has gone wrong')
  }

}
startServer()





