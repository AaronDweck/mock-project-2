import mongoose from 'mongoose'

const pokemonSchema = new mongoose.Schema({
    number: {
        type: Number, 
        required: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                console.log('test:',value)
                // Ensure the string does not represent a number
                return isNaN(value);
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