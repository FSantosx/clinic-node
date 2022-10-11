const mongoose= require('mongoose');

const data = new mongoose.Schema({
    name : {
        required: true
        , type : String
    }, 
    age : {
        required: true
        , type: Number
    }
})

module.exports = mongoose.model('Pacient', data);