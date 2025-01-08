import mongoose from "mongoose";
import pokemon from "../data.js";
import Pokemon from "../models/pokemon.js"

async function seed() {
    await mongoose.connect('mongodb://127.0.0.1:27017/pokemon-db')
    await mongoose.connection.db.dropDatabase()
    await Pokemon.create(pokemon)
    await mongoose.disconnect()
}

seed()