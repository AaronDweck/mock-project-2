import express from 'express'
import pokemon from './data.js'
import mongoose from 'mongoose'
import Pokemon from './models/pokemon.js'

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Home')
});

// Get a Pokemon by its name
app.get('/pokemon/:pokemonName', async (req, res) => {
    const pokemonName = await Pokemon.findOne({'name': req.params.pokemonName})
    
    res.send(pokemonName)
})

// Add a new pokemon to the DB
app.post('/pokemon', async (req, res) => {
    const newPokemon = await Pokemon.create(req.body)
    res.status(201).send(newPokemon)
});

// Delete a Pokemon by its name
app.delete('/pokemon/:pokemonName', async (req, res) => {
    const pokemonName = await Pokemon.deleteOne({'name': req.params.pokemonName})
    
    res.send(pokemonName)
});

// Update a Pokemon by its name
app.put('/pokemon/:pokemonName/:property/:value', async (req, res) => {
    const pokemonName = req.params.pokemonName
    const pokemonProperty = req.params.property
    let propertyValue = req.params.value
    // Error detection for the propertyValue
    if (!isNaN(propertyValue)){
        propertyValue = Number(propertyValue)
    } else if (propertyValue === 'true'){
        propertyValue = true
    } else if (propertyValue === 'false'){
        propertyValue = false
    }
    const pokemonObj = await Pokemon.updateOne({'name': pokemonName},{[pokemonProperty]: propertyValue})

    res.send(pokemonObj)
})

app.listen(3000, () => {
    console.log('Listening on port 3000')
})

const url = 'mongodb://127.0.0.1:27017/'
const dbname = 'pokemon-db'
mongoose.connect(url + dbname)