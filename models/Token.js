const mongoose = require('mongoose')

const tokenSchema = mongoose.Schema({
    token: {
        type: String,
        max: 64*1024
    }
})

module.exports = mongoose.model('Token', tokenSchema)