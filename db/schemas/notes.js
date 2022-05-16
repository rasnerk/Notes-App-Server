const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    Title: {
        required: true,
        type: String
    },
    Body: {
        required: true,
        type: String
    },
    type: {
        type: String
    },
    uid: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Note',noteSchema);