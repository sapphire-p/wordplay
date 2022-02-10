import express from 'express'
import mongoose from 'mongoose'
import { port, dbURI } from './config/environment.js'
import Game from './models/game.js'

const app = express()
// const port = 4000
// const dbURI = 'mongodb://127.0.0.1:27017/wordplay-api'


/* Body parser middleware - if incoming request is JSON, this will convert it into JavaScript and add it to the request object in a key called 'body', accessed using req.body */
app.use(express.json())


/* Logger middleware - logs the type and url of the request detected by the app.listen function */
app.use((req, _res, next) => {
  console.log(`🚨 Incoming ${req.method} request to ${req.url}`)
  next()
})



//* Index route - GET all games
app.get('/games', async (_req, res) => {
  const games = await Game.find()
  // console.log('GAMES ->', games)
  return res.status(200).json(games)
})

//* Create route - POST a new game to be added to the db
app.post('/games', async (req, res) => {
  try {
    const gameToAdd = await Game.create(req.body)
    return res.status(201).json(gameToAdd)
  } catch (err) {
    console.log(err)
    return res.status(422).json(err)
  }
})

//* Show route - GET a single game
app.get('/games/:id', async (req, res) => {
  try {
    const { id } = req.params
    const singleGame = await Game.findById(id)
    if (!singleGame) throw new Error()
    return res.status(200).json(singleGame)
  } catch (err) {
    console.log(err)
    return res.status(404).json({ message: 'Not Found' })
  }
})

//* Delete route - DELETE a single game
app.delete('/games/:id', async (req, res) => {
  try {
    const { id } = req.params
    const gameToDelete = await Game.findOneAndDelete({ _id: id })
    if (!gameToDelete) throw new Error()
    return res.sendStatus(204)
  } catch (err) {
    console.log(err)
    return res.status(404).json({ message: 'Not Found' })
  }
})


//* Update route - PUT update a single game
app.put('/games/:id', async (req, res) => {
  try {
    const { id } = req.params
    const gameToUpdate = await Game.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true })
    if (!gameToUpdate) throw new Error()
    return res.status(202).json(gameToUpdate)
  } catch (err) {
    console.log(err)
    return res.status(404).json({ message: 'Not Found' })
  }
})


const startServer = async () => {
  try {

    await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    console.log('👌 Database successfully connected')

    // /* Logger middleware - logs the type and url of the request detected by the app.listen function */
    // app.use((req, _res, next) => {
    //   console.log(`🚨 Incoming ${req.method} request to ${req.url}`)
    //   next()
    // })

    // /* Body parser middleware - if incoming request is JSON, this will convert it into JavaScript and add it to the request object in a key called 'body', accessed using req.body */
    // app.use(express.json())

    /* Listen function - listens out on the specified port, will detect any requests made to the server */
    app.listen(port, () => console.log(`🚀 Express is up and running on port ${port}`))

  } catch (err) {
    console.log(err)
    console.log('❗️ Something has gone wrong')
  }

}
startServer()





