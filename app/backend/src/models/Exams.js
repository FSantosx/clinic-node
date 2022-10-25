const mongoose = require('mongoose')


const Exam = mongoose.model("Exam", {
    date        : String,
    exam        : String,
    Appointment : String
})

module.exports = Exam