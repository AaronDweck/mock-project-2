import mongoose from "mongoose";
import pokemon from "../data.js";
import Pokemon from "../models/pokemon.js"
import User from "../models/user.js";

async function seed() {
    await mongoose.connect('mongodb://127.0.0.1:27017/pokemon-db')
    await mongoose.connection.db.dropDatabase()
    const users = await User.create([
        {username: 'aaron', email: 'aarondweck24@gmail.com', password: 'Password1!'},
        {username: 'test', email: 'test@test.com', password: 'Password1!'}
    ])
    pokemon.forEach(pokemon => pokemon.user = users[0])
    await Pokemon.create(pokemon)
    await mongoose.disconnect()
}

seed()