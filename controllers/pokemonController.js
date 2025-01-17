import express from 'express'
import Pokemon from '../models/pokemon.js'

const router = express.Router()

// Get the home page
router.route('/').get(async (req, res, next) => {
    try {
        res.render('home.ejs', {
            loggedIn: req.session.user
        })
    } catch (err) {
        next(err)
    }
})

// Add a new pokemon to the DB
router.route('/pokemon').post(async (req, res, next) => {
    try {
        if (!req.session.user) {
            return res.send({ message: 'you must be logged in' })
        }

        if (req.body.starter === "on") {
            req.body.starter = true;
        } else {
            req.body.starter = false;
        }

        req.body.user = req.session.user

        await Pokemon.create(req.body)
        res.status(201).redirect(`/pokemon/${req.body.name}`)
    } catch (err) {
        console.log('first test')
        res.locals.page = '/pokemon/new'
        next(err)
    }
})

// route to display all pokemon
router.route('/pokemon').get(async (req, res, next) => {
    try {
        const allPokemon = await Pokemon.find().sort({ number: 1 })

        res.render('pokemon/index.ejs', {
            allPokemon: allPokemon,
            loggedIn: req.session.user
        })
    } catch (err) {
        next(err)
    }
})

// route to page for creating a new pokemon
router.route('/pokemon/new').get(async (req, res, next) => {
    try {
        if (!req.session.user) {
            return res.send({ message: 'you must be logged in' })
        }
        res.render('pokemon/new.ejs', {
            loggedIn: req.session.user
        })
    } catch (err) {
        next(err)
    }
})

// route to page of specific pokemon
router.route('/pokemon/:pokemonName').get(async (req, res, next) => {
    try {
        const pokemonByName = await Pokemon.findOne({ 'name': req.params.pokemonName }).populate('comments.user').populate('user')
        if (!pokemonByName) {
            res.send({ message: "that is an invalid request" })
        }
        let correctTrainer
        try {
            correctTrainer = pokemonByName.user._id.equals(req.session.user._id)
        } catch (err) {
            correctTrainer = false
        }

        res.render('pokemon/show.ejs', {
            pokemon: pokemonByName,
            loggedIn: req.session.user,
            correctTrainer: correctTrainer
        })

    } catch (err) {
        next(err)
    }
})

// route for page to update a pokemon
router.route('/pokemon/:pokemonName/update').get(async (req, res, next) => {
    try {
        if (!req.session.user) {
            return res.send({ message: 'you must be logged in' })
        }

        const pokemonByName = await Pokemon.findOne({ 'name': req.params.pokemonName })

        if (!pokemonByName) {
            return res.send({ message: "that is an invalid request" })
        }

        res.render('pokemon/update.ejs', {
            pokemon: pokemonByName,
            loggedIn: req.session.user
        })
    } catch (err) {
        next(err)
    }
})

// Update a Pokemon by its name
router.route('/pokemon/:pokemonName/update').put(async (req, res, next) => {
    try {
        if (!req.session.user) {
            return res.send({ message: 'you must be logged in' })
        }

        const pokemonByName = await Pokemon.findOne({ 'name': req.params.pokemonName }).populate('user')

        if (!pokemonByName.user._id.equals(req.session.user._id)) {
            return res.send({ message: 'you arent authorized to make these changes' })
        }

        if (req.body.starter === "on") {
            req.body.starter = true;
        } else {
            req.body.starter = false;
        }

        const pokemonName = req.params.pokemonName
        await Pokemon.updateOne({ 'name': pokemonName }, req.body, { runValidators: true })

        res.redirect(`/pokemon/${req.body.name}`)
    } catch (err) {
        res.locals.page = `/pokemon/${req.params.pokemonName}/update`
        next(err)
    }
})

// Delete a Pokemon by its name
router.route('/pokemon/:pokemonName').delete(async (req, res, next) => {
    try {
        if (!req.session.user) {
            return res.send({ message: 'you must be logged in' })
        }
        const pokemonByName = await Pokemon.findOne({ 'name': req.params.pokemonName }).populate('user')
        if (!pokemonByName.user._id.equals(req.session.user._id)) {
            return res.send({ message: 'you arent authorized to make these changes' })
        }

        await Pokemon.deleteOne({ 'name': req.params.pokemonName })

        res.redirect('/pokemon')
    } catch (err) {
        next(err)
    }
})

export default router