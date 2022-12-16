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
    urlImg: {
        type: String
    },
    dateCreate: {
        type: String
    },
    numberCourses: {
        type: [Object]
    }

})

module.exports = mongoose.model('DataUser', dataSchema)