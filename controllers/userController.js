import express from 'express'
import User from '../models/user.js'

const router = express.Router()

router.route('/user/signup').post(async (req, res, next) => {
    try{
        if (req.body.password === req.body.passwordConfirmation){
            const newUser = await User.create(req.body)
            res.redirect('/user/login')
        } else {
            res.send({message: 'Passwords do not match'})
        }
    } catch (err) {
        next(err)
    }
})

router.route('/user/login').post(async (req, res, next) => {
    try {
        const user = await User.findOne({username: req.body.username})
        if (user.isPasswordValid(req.body.password)){
            res.send({message: 'Login successful'})
        } else {
            res.send({message: 'Incorrect login'})
        }
    } catch (err){
        next(err)
    }
})

router.route('/user/login').get( async (req, res, next) => {
    try{
        res.render('user/login.ejs')
    } catch (err) {
        next(err)
    }
})

router.route('/user/signup').get( async (req, res, next) => {
    try{
        res.render('user/signup.ejs')
    } catch (err) {
        next(err)
    }
})

export default router
