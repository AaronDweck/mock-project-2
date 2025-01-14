import mongoose from 'mongoose'

const pokemonSchema = new mongoose.Schema({
    number: {
        type: Number,
        required: true,
        unique: true,
        cast: 'Please enter a valid number.'
    },
    name: {
        type: String,
        required: true,
        unique: true,
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
    }
})

export default mongoose.model('Pokemon', pokemonSchema)