const mongoose  = require('mongoose')

const Doctor = mongoose.model("Doctor", {
    name                    : String,
    crm                     : String,
    email                   : String,
    especiality             : String,
    cellphone               : String, 
    credentials  : [{ 
        user                : String,
        password            : String,
        active              : Boolean
    }],
})

module.exports = Doctor