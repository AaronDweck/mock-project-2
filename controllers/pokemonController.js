import express from 'express'
import Pokemon from '../models/pokemon.js'

const router = express.Router()

// Get the home page
router.route('/').get(async (req, res) => {
    try{
        res.render('home.ejs')
    } catch (e) {
        console.log(e)
    }
})

// Add a new pokemon to the DB
router.route('/pokemon').post(async (req, res) => {
    try {
        const newPokemon = await Pokemon.create(req.body)
        res.status(201).send(newPokemon)
    } catch (e) {
        console.dir(e)
        if (e.name === 'ValidationError') {
            res.send({ message: "your request doesn't meet the correct requirements" })
        } else {
            res.send({ message: 'There is something wrong with your request' })
        }

    }
})

router.route('/pokemon').get( async (req, res) => {
    const allPokemon = await Pokemon.find().sort({ number: 1})

    res.render('pokemon/index.ejs', {
        allPokemon: allPokemon
    })
})

// Get a Pokemon by its name
router.route('/pokemon/:pokemonName').get(async (req, res) => {
    const pokemonByName = await Pokemon.findOne({ 'name': req.params.pokemonName })
    if (!pokemonByName) {
        res.send({ message: "that is an invalid request" })
    } else {
        res.render('pokemon/show.ejs',{
            pokemon: pokemonByName
        })
    }
})

// Update a Pokemon by its name
router.route('/pokemon/:pokemonName/:property/:value').put(async (req, res) => {
    try {
        const pokemonName = req.params.pokemonName
        const pokemonProperty = req.params.property
        let propertyValue = req.params.value

        const pokemonObj = await Pokemon.updateOne({ 'name': pokemonName }, {[pokemonProperty]: propertyValue}, {runValidators: true})
    
        res.send(pokemonObj)
    } catch (e){
        if (e.name === 'CastError'){
            res.send({ message: "your value doesn't meet the correct requirements" })
        } else if(e.name === 'ValidationError') {
            res.send({ message: "your request doesn't meet the correct requirements" })
        } else {
            console.log(e)
        }
    }
})

// Delete a Pokemon by its name
router.route('/pokemon/:pokemonName').delete(async (req, res) => {
    const pokemonName = await Pokemon.deleteOne({ 'name': req.params.pokemonName })

    res.send(pokemonName)
})

export default router