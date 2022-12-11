const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    role: {
        type: String
    },
    urlAvatar: {
        type: String
    },
    dateCreate: {
        type: String
    },
    numberCourses: {
        type: [String]
    }

})

module.exports = mongoose.model('DataUser', dataSchema)