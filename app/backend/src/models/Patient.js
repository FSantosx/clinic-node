const mongoose= require('mongoose');
const medicalRecords = require("./medicalRecords")

const data = new mongoose.Schema({
    name : {
        required: true
        , type : String
    }, 
    birthday : {
        required: true
        , type: Number
    },
    email : {
        required: true
        , type : String
    },
    record : {
        required: true
        , children: [ medicalRecords ]
    }
})

module.exports = mongoose.model('Pacient', data);