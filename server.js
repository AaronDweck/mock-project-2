import express from 'express'
import mongoose from 'mongoose'
import pokemonController from './controllers/pokemonController.js'
import userController from './controllers/userController.js'
import errorHandler from './middleware/errorHandler.js'
import methodOverride from 'method-override'
import path from 'path'
import { fileURLToPath } from "url"
import mongoSanitize from 'express-mongo-sanitize'
import session from 'express-session'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24
    }
}))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

// Resolve __dirname in ES module
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
app.use(express.static(path.join(__dirname, "public")))

app.use(mongoSanitize({ replaceWith: '_' }))

app.use('/', pokemonController)
app.use('/', userController)

app.use(errorHandler)

app.listen(3000, () => {
    console.log('Listening on port 3000')
})

const url = 'mongodb://127.0.0.1:27017/'
const dbname = 'pokemon-db'
mongoose.connect(url + dbname)