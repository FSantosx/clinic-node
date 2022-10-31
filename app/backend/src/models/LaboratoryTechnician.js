const mongoose  = require('mongoose')

const laboratoryTechnician = mongoose.model("laboratoryTechnician", {
    name                    : String,
    crf                     : String,
    email                   : String,
    cellphone               : String, 
    credentials  : [{ 
        user                : String,
        password            : String,
        active              : Boolean
    }],
})

module.exports = laboratoryTechnician