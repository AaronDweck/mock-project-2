import express from 'express'
import User from '../models/user.js'

const router = express.Router()

router.route('/user/signup').post(async (req, res, next) => {
    try{
       const newUser = await User.create(req.body)
       res.redirect('/user/signup')
    } catch (err) {
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
