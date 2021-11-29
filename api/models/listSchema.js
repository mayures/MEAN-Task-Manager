const mongoose = require('mongoose')

const listSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        minlength: 1,
        required: true
    }
})

module.exports = mongoose.model('list', listSchema)
