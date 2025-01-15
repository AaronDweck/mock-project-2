import express from 'express'
import Pokemon from '../models/pokemon.js'

const router = express.Router()

router.route('/pokemon/:pokemonName/add-comment').post( async (req, res, next) =>{
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

export default router