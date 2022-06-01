const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        required: true,
        type: String,
        unique: true
    },
    name: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    authToken: {
        type: String
    }
})

module.exports = mongoose.model('User',userSchema);