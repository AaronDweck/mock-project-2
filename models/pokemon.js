import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: [true, "You can't post an empty comment."]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
})

const pokemonSchema = new mongoose.Schema({
    number: {
        type: Number,
        required: true,
        unique: [true, 'that number is already in use'],
        cast: 'Please enter a valid number.'
    },
    name: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return isNaN(value)
            },
            message: 'Please enter a valid name.'
        }
    },
    type: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return isNaN(value)
            },
            message: 'Please enter a valid type.'
        }
    },
    hp: {
        type: Number,
        required: true,
        cast: 'Please enter a valid number.'
    },
    starter: {
        type: Boolean,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    comments: [commentSchema]
})

pokemonSchema.plugin(uniqueValidator)

export default mongoose.model('Pokemon', pokemonSchema)