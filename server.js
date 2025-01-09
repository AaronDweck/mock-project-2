import express from 'express'
// import pokemon from './data.js'
import mongoose from 'mongoose'
// import Pokemon from './models/pokemon.js'
import pokemonController from './controllers/pokemonController.js'

const app = express()

app.use(express.json())

app.use('/', pokemonController)

app.listen(3000, () => {
    console.log('Listening on port 3000')
})

const url = 'mongodb://127.0.0.1:27017/'
const dbname = 'pokemon-db'
mongoose.connect(url + dbname)