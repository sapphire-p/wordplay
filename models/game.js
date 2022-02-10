import mongoose from 'mongoose'

const gameSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true, maxlength: 1000 },
  image: { type: String, required: true, default: 'https://res.cloudinary.com/dfgnpqkiv/image/upload/v1644264634/WordPlay/default_blue-scrabble-letters_n4ahbk.jpg' },
  categories: [{ type: String, required: true }],
  numberOfPlayers: { type: String, required: true }
})

export default mongoose.model('Game', gameSchema)