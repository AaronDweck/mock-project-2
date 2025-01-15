import express from 'express'
import Pokemon from '../models/pokemon.js'
import pokemon from '../models/pokemon.js'

const router = express.Router()

router.route('/comment/:pokemonName/add-comment').post(async (req, res, next) => {
    try {
        if (!req.session.user) {
            return res.redirect('/user/login')
        }
        req.body.user = req.session.user
        const pokemonByName = await Pokemon.findOne({ 'name': req.params.pokemonName })
        pokemonByName.comments.push(req.body)
        await pokemonByName.save()
        // console.log(req.body)
        res.status(201).redirect(`/pokemon/${req.params.pokemonName}`)
    } catch (err) {
        next(err)
    }
})

router.route('/comment/:pokemonName/:commentID').delete(async (req, res, next) => {
    try {
        const pokemonByName = await Pokemon.findOne({ 'name': req.params.pokemonName })
        const commentByID = pokemonByName.comments.find(comment => {
            return comment._id.equals(req.params.commentID)
        })
        console.log('before--------------')
        console.log(pokemonByName.comments)
        pokemonByName.comments.splice(pokemonByName.comments.indexOf(commentByID), 1)
        console.log('after--------------')
        console.log(pokemonByName.comments)
        await pokemonByName.save()
        res.redirect(`/pokemon/${req.params.pokemonName}`)
    } catch (err) {
        next(err)
    }
})

export default router