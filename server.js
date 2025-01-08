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

app.delete('/pokemon/:pokemonName', (req, res) => {
    const pokemonName = req.params.pokemonName
    const index = pokemon.findIndex(pokemon => pokemon.name.toLowerCase() === pokemonName.toLowerCase())
    if (index !== -1) {
        pokemon.splice(index, 1);
    }
    res.send('deleted')
});

app.put('/pokemon/:pokemonName/:property/:value', (req, res) => {
    const pokemonName = req.params.pokemonName
    const pokemonProperty = req.params.property
    const propertyValue = Number(req.params.value)
    const pokemonObj = pokemon.find( pokemon => pokemon.name.toLowerCase() === pokemonName.toLowerCase())

    pokemonObj[pokemonProperty] = propertyValue

    res.send(pokemonObj)
})

app.listen(3000, () => {
    console.log('Listening on port 3000')
})

const url = 'mongodb://127.0.0.1:27017/'
const dbname = 'pokemon-db'
mongoose.connect(url + dbname)