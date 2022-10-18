const mongoose= require('mongoose');

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
    password : {
        required: true
        , type : String
    },
    userType : {
        required: true
        , type : String
    },
})

module.exports = mongoose.model('Users', data);