import mongoose, { Schema } from "mongoose"
import uniqueValidator from 'mongoose-unique-validator'

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

export default mongoose.model('User', userSchema)