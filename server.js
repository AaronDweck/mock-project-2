import express from 'express'
import pokemon from './data.js'
import mongoose from 'mongoose'
import Pokemon from './models/pokemon.js'

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Home')
});

app.get('/pokemon/:pokemonName', async (req, res) => {
    const pokemonName = await Pokemon.findOne({'name': req.params.pokemonName})
    
    res.send(pokemonName)
})

app.post('/pokemon', async (req, res) => {
    const newPokemon = await Pokemon.create(req.body)
    res.status(201).send(newPokemon)
});

app.delete('/pokemon/:pokemonName', async (req, res) => {
    const pokemonName = await Pokemon.deleteOne({'name': req.params.pokemonName})
    
    res.send(pokemonName)
});

app.put('/pokemon/:pokemonName/:property/:value', async (req, res) => {
    const pokemonName = req.params.pokemonName
    const pokemonProperty = req.params.property
    const propertyValue = Number(req.params.value)
    const pokemonObj = await Pokemon.updateOne({'name': pokemonName},{[pokemonProperty]: propertyValue})

    res.send(pokemonObj)
})

app.listen(3000, () => {
    console.log('Listening on port 3000')
})

const url = 'mongodb://127.0.0.1:27017/'
const dbname = 'pokemon-db'
mongoose.connect(url + dbname)