const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        minlength: 1,
        required: true
    },
    _listId :{
        type: mongoose.Types.ObjectId,
        required: true
    }
})

module.exports = mongoose.model('task', taskSchema)
