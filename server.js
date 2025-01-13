import express from 'express'
import mongoose from 'mongoose'
import pokemonController from './controllers/pokemonController.js'
import userController from './controllers/userController.js'
import errorHandler from './middleware/errorHandler.js'
import methodOverride from 'method-override'
// const path = require("path");



const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

// app.use(express.static(path.join(__dirname, "public")))

app.use('/', pokemonController)
app.use('/', userController)

app.use(errorHandler)

app.listen(3000, () => {
    console.log('Listening on port 3000')
})

const url = 'mongodb://127.0.0.1:27017/'
const dbname = 'pokemon-db'
mongoose.connect(url + dbname)