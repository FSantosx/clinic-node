const mongoose = require('mongoose')

const userAdmin = mongoose.model("UserAdmin", {
    name        :       String,
    type        :       String,
    email       :       String,
    pass        :       String,
    active      :       Boolean,
})

module.exports = userAdmin