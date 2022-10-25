const mongoose = require('mongoose')

const User = mongoose.model("User", {
    name        :       String,
    type        :       String,
    email       :       String,
    pass        :       String,
    birthday    :       String,
    active      :       Boolean,
})

module.exports = User