const mongoose  = require('mongoose')

const Recepcionist = mongoose.model("Recepcionist", {
    name                    : String,
    cpf                     : String,
    email                   : String,
    cellphone               : String, 
    credentials  : [{ 
        user                : String,
        password            : String,
        active              : Boolean
    }],
})

module.exports = Recepcionist