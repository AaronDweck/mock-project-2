import mongoose from "mongoose";
import pokemon from "../data.js";
import Pokemon from "../models/pokemon.js"
import User from "../models/user.js";

async function seed() {
    await mongoose.connect('mongodb://127.0.0.1:27017/pokemon-db')
    await mongoose.connection.db.dropDatabase()
    await Pokemon.create(pokemon)
    await User.create({
        username: 'AaronDweck',
        email: 'aarondweck24@gmail.com',
        password: 'password'
    })
    await mongoose.disconnect()
}

seed()