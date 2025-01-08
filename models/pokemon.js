import mongoose from 'mongoose'

const pokemonSchema = new mongoose.Schema({
    number: {type: Number, required: true},
    name: {type: String, required: true},
    type: {type: String, required: true},
    hp: {type: Number, required: true},
    starter: {type: Boolean, required: true},
})

export default mongoose.model('Pokemon', pokemonSchema)