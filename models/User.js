const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        max: 255,
        min: 6,
        required: true
    },
    email: {
        type: String,
        max: 255,
        min: 6,
        required: true
    },
    password: {
        type: String,
        max: 1024,
        min: 6,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);