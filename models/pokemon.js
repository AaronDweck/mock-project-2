import mongoose from 'mongoose'

const pokemonSchema = new mongoose.Schema({
    number: {
        type: Number, 
        required: true
    },
    name: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
                return isNaN(value)
            },
            message: (props) => `${props.value} is not a valid name. It cannot be a number.`
        }
    },
    type: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return isNaN(value)
            },
            message: (props) => `${props.value} is not a valid type. It cannot be a number.`
        }
        
    },
    hp: {
        type: Number,
        required: true
    },
    starter: {
        type: Boolean,
        required: true
    },
})

export default mongoose.model('Pokemon', pokemonSchema)