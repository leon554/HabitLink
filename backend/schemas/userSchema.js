const mongoose = require("mongoose")

const completionSchema = new mongoose.Schema({
    data: Number,
    date: Number
})
const habitSchema = new mongoose.Schema({
    habitName: {
        type: String,
    },
    numeric: Boolean,
    unit: String,
    color: String,
    completions: [completionSchema]
})
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    habits: [habitSchema]
})

module.exports = mongoose.model('User', userSchema)