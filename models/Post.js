const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    message: {
        type: String,
        min: 6,
        max: 1024,
        required: true
    },
    userName: {
        type: String,
        min:6,
        max:255,
        required: true
    },
    userId: {
        type: String,
        min: 6,
        max: 50,
        required: true
    },
    creationDate: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Post', postSchema);