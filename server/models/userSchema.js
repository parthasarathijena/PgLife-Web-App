const mongoose = require('mongoose');

const userScehema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        required: true,
        length: 10,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 6
    },
    college: {
        type: String,
        required: true
    },
    gender: {
        type: Number,
        default: 1,
        enum: [1, 2]
    }
})


const User = mongoose.model('USER', userScehema);
module.exports = User;