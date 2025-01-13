import express from 'express'
import mongoose from 'mongoose'
import pokemonController from './controllers/pokemonController.js'
import userController from './controllers/userController.js'
import errorHandler from './middleware/errorHandler.js'
import methodOverride from 'method-override'
import path from 'path'
import { fileURLToPath } from "url";


const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

// Resolve __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(__filename)
console.log(__dirname)


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