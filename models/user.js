import mongoose, { Schema } from "mongoose"
import uniqueValidator from 'mongoose-unique-validator'
import bcrypt from 'bcrypt'

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
    },
    password: {
        type: String,
        required: true
    },
})

userSchema.plugin(uniqueValidator);

userSchema.pre('save', function(next) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync())
    next()
})

userSchema.methods.isPasswordValid = function(password){
    return bcrypt.compareSync(password, this.password)
}

export default mongoose.model('User', userSchema)