const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    lecture: {
        type: String,
        required: true
    },
    dateStart: {
        type: String,
        required: true
    },
    studentNumber: {
        type: Number,
    }


})

module.exports = mongoose.model('Data', dataSchema)