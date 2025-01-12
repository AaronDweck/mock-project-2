import express from 'express'
import Pokemon from '../models/pokemon.js'

const router = express.Router()

// Get the home page
router.route('/').get(async (req, res, next) => {
    try{
        res.render('home.ejs')
    } catch (err) {
        next(err)
    }
})

//  todo fix this so the route handles the starter value from the checkbox 
// Add a new pokemon to the DB
router.route('/pokemon').post(async (req, res, next) => {
    try {
        if (req.body.starter === "on") {
            req.body.starter = true;
          } else {
            req.body.starter = false;
          }
        const newPokemon = await Pokemon.create(req.body)
        res.status(201).redirect('/pokemon')
    } catch (err) {
        next(err)
    }
})

router.route('/pokemon').get( async (req, res, next) => {
    try{
        const allPokemon = await Pokemon.find().sort({ number: 1})
    
        res.render('pokemon/index.ejs', {
            allPokemon: allPokemon
        })
    } catch (err){
        next(err)
    }
})

router.route('/pokemon/new').get( async (req, res, next) => {
    try {
        res.render('pokemon/new.ejs')
    } catch (err) {
        next(err)
    }
})

// Get a Pokemon by its name
router.route('/pokemon/:pokemonName').get(async (req, res, next) => {
    try {
        const pokemonByName = await Pokemon.findOne({ 'name': req.params.pokemonName })
        if (!pokemonByName) {
            res.send({ message: "that is an invalid request" })
        } else {
            res.render('pokemon/show.ejs',{
                pokemon: pokemonByName
            })
        }
    } catch (err) {
        next(err)
    }
})

// Get a Pokemon by its name
router.route('/pokemon/:pokemonName/update').get(async (req, res, next) => {
    try {
        const pokemonByName = await Pokemon.findOne({ 'name': req.params.pokemonName })
        if (!pokemonByName) {
            res.send({ message: "that is an invalid request" })
        } else {
            res.render('pokemon/update.ejs',{
                pokemon: pokemonByName
            })
        }
    } catch (err) {
        next(err)
    }
})

// Update a Pokemon by its name
router.route('/pokemon/:pokemonName/update').put(async (req, res, next) => {
    try {
        if (req.body.starter === "on") {
            req.body.starter = true;
          } else {
            req.body.starter = false;
          }
        const pokemonName = req.params.pokemonName
        const pokemonObj = await Pokemon.updateOne({ 'name': pokemonName }, req.body, {runValidators: true})
    
        res.redirect(`/pokemon/${req.body.name}`)
    } catch (err){
        next(err)
    }
})

// Delete a Pokemon by its name
router.route('/pokemon/:pokemonName').delete(async (req, res, next) => {
    try {
        const pokemonName = await Pokemon.deleteOne({ 'name': req.params.pokemonName })
    
        res.redirect('/pokemon')
    } catch (err) {
        next(err)
    }
})

export default router