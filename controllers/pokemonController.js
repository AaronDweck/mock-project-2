import express from 'express'
import Pokemon from '../models/pokemon.js'

const router = express.Router()

// Add a new pokemon to the DB
router.route('/pokemon').post(async (req, res) => {
    const newPokemon = await Pokemon.create(req.body)
    res.status(201).send(newPokemon)
})

// Get a Pokemon by its name
router.route('/pokemon/:pokemonName').get(async (req, res) => {
    const pokemonName = await Pokemon.findOne({'name': req.params.pokemonName})
    
    res.send(pokemonName)
})

// Update a Pokemon by its name
router.route('/pokemon/:pokemonName/:property/:value').put(async (req, res) => {
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

// Delete a Pokemon by its name
router.route('/pokemon/:pokemonName').delete(async (req, res) => {
    const pokemonName = await Pokemon.deleteOne({'name': req.params.pokemonName})
    
    res.send(pokemonName)
})

export default router