import mongoose, { Schema } from "mongoose"
import uniqueValidator from 'mongoose-unique-validator'
import bcrypt from 'bcrypt'
import validator from 'validator'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            message: 'Please enter a valid email.',
            validator: (email) => validator.isEmail(email)
        }
    },
    password: {
        type: String,
        required: true,
        match: [/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/, 'password needs 1 uppercase, 1 lowercase, 1 number, 1 symbol and 8 characters long.']
    }
})

userSchema.plugin(uniqueValidator);

userSchema.pre('save', function (next) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync())
    next()
})

userSchema.methods.isPasswordValid = function (password) {
    return bcrypt.compareSync(password, this.password)
}

export default mongoose.model('User', userSchema)